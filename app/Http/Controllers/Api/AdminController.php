<?php

namespace App\Http\Controllers\Api;

use Throwable;
use App\Models\User;
use App\Models\Department;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ResponseController;

class AdminController extends Controller
{
    use ResponseController;

    public function fetchDepartments(){
        $departments = Department::orderBy('name', 'ASC')->get();
        return $this->sendResponse('Departments successfully fetched', [
            'departments' => $departments
        ]);
    }

    public function create_user(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'account_id' => 'required|string',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'role' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation failed', [
                "data" => $validator->errors()->all()
            ], 422);
        }

        $user = new User;
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->account_id = $request->account_id;
        $user->role = $request->role;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->department_id = $request->department_id;
        $user->level = $request->level;
        $user->password = Hash::make('12345678');
        if ($user->save()) {
            return $this->sendResponse('User created successfully', [
                'user' => $user
            ]);
        } else {
            return $this->sendError('Could not save user due to an unexpected error', [
                "data" => $validator->errors()->all()
            ], 422);
        }
    }

    public function update_user(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Could not detect the user. An id might be required!', [
                "data" => $validator->errors()->all()
            ], 422);
        }

        $user = User::where('id', $request->user_id)->first();
        if (isset($request->role)) {
            $user->role = $request->role;
        }

        if ($user->update()) {
            return $this->sendResponse('User updated successfully', [
                'user' => $user
            ]);
        } else {
            return $this->sendError('Could not update user due to an unexpected error', [
                "data" => $validator->errors()->all()
            ], 500);
        }
    }

    public function delete_users(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Could not detect the user. An id might be required!', [
                "data" => $validator->errors()->all()
            ], 422);
        }

        try{
            $deleteUser = User::where('id', $request->user_id)->delete();
            if($deleteUser){
                return $this->sendResponse("Users deleted successfully", []);
            }else{
                return $this->sendError('Could not delete user');
            }
        }catch(Throwable $th){
            return $this->sendError($th->getMessage());
        }
    }
    
    public function fetch_users()
    {
        $users = User::orderBy('firstname', 'ASC')->paginate(10);
        return $this->sendResponse("Users fetched in successfully", [
            'users' => $users
        ]);
    }

    public function search_users(Request $request)
    {
        if (isset($request->searchValue)) {
            // if ($request->searchValue !== '') {
                $users = User::where('account_id', $request->searchValue)->orWhere('firstname', 'LIKE', '%' . $request->searchValue . '%')
                    ->orWhere('lastname', 'LIKE', '%' . $request->searchValue . '%')->orWhere('username', 'LIKE', '%' . $request->searchValue . '%')
                    ->orderBy('firstname', 'ASC')->paginate(20);
            // } else {
            //     $users = User::orderBy('firstname', 'ASC')->paginate(20);
            // }
        }else{
            $users = User::orderBy('firstname', 'ASC')->paginate(20);
        }
        return $this->sendResponse("Search result returned successfully", [
            'users' => $users
        ]);
    }
}
