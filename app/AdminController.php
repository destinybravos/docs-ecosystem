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
use App\Models\Document;
use App\Models\Faculty;

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

        if (!User::where('id', $request->user_id)->exists()) {
            return $this->sendError("Could not find the selected user", [], 404);
        }

        $user = User::where('id', $request->user_id)->first();
        if (isset($request->role)) {
            $user->role = $request->role;
        }
        if (isset($request->firstname)) {
            $user->firstname = $request->firstname;
        }
        if (isset($request->lastname)) {
            $user->lastname = $request->lastname;
        }
        if (isset($request->account_id)) {
            $user->account_id = $request->account_id;
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

        if (!User::where('id', $request->user_id)->exists()) {
            return $this->sendError("Could not find the selected user", [], 404);
        }

        $deleteUser = User::where('id', $request->user_id)->delete();
        if($deleteUser){
            return $this->sendResponse("Users deleted successfully", []);
        }else{
            return $this->sendError('Could not delete user');
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
                    ->orWhere('lastname', 'LIKE', '%' . $request->searchValue . '%')
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

    public function save_faculty(Request $request){
     
        $faculty = new Faculty();
        $faculty->name = $request->faculty_name;
        if($faculty->save()){
            return $this->sendResponse("Faculty saved successfully", [
                'status' => true
            ]);
        }else{
            return $this->sendError('Could not save faculty',[
                'status' => false
            ]);
        }
    }

    public function save_department(Request $request){
     
        $dept = new Department();
        $dept->name = $request->department;
        $dept->faculty_id = $request->faculty_id;
        $dept->type = $request->type;
        if($dept->save()){
            return $this->sendResponse("Department saved successfully", [
                'status' => true
            ]);
        }else{
            return $this->sendError('Could not save department',[
                'status' => false
            ]);
        }
    }

    public function fetch_faculties()
    {
        $faculties = Faculty::all();
        return $this->sendResponse("Faculties fetch successfully.", [
            'status' =>true,
            'faculties' => $faculties
        ]);
    }

    public function fetchDashboardStats(Request $request)
    {
        $no_students = User::where('role', 'student')->count();
        $no_staff = User::where('role', 'staff')->count();
        $documents = Document::count();
        $no_downloads = Document::sum('no_downloads');
        return $this->sendResponse("Faculties fetch successfully.", [
            'statistics' => [
                'no_students' => $no_students,
                'no_staff' => $no_staff,
                'no_documents' => $documents,
                'no_downloads' => $no_downloads
            ]
        ]);
    }
}
