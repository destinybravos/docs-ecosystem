<?php

namespace App\Http\Controllers;

use App\Models\AccessRequest;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Document;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class PageController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('HomeScreen', []);
    }



    // Authenticated Rouute Methods
    public function complete_registration(Request $request) 
    {
        $departments = Department::where('type', '!=', 'administrative')->get();
        return Inertia::render('Auth/CompleteRegistration', [
            'departments' => $departments,
        ]);
    }

    public function save_complete_userdata(Request $request) 
    {
        $validate = Validator::make($request->all(), [
            'department_id' => 'required',
            'account_id' => 'required',
        ]);

        if ($validate->fails()) {
            return redirect()->back()->with('status', 'Missing required feilds. Please ensure you have Department and Matric Number in your request');
        }

        $request->user()->update($request->all());
        return redirect()->route('dashboard');
    }

    public function dashboard(Request $request)
    {
        $no_students = User::where('role', 'student')->count();
        $no_staff = User::where('role', 'staff')->count();
        $no_documents = Document::count();
        $no_downloads = Document::sum('no_downloads');
        $departments = Department::orderBy('name', 'ASC')->get();
        $documents = Document::orderBy('updated_at', 'DESC')->orderBy('no_views', 'ASC')->orderBy('no_downloads')->take(5)->get();
        return Inertia::render('Admin/Dashboard', [
            'statistics' => [
                'no_students' => $no_students,
                'no_staff' => $no_staff,
                'no_documents' => $no_documents,
                'no_downloads' => $no_downloads,
                'departments' => $departments,
                'documents' => $documents
            ]
        ]);
    }

    public function docmentEcosystem(Request $request)
    {
        return Inertia::render('Admin/ManageDocument', []);
    }

    public function manageUsers(Request $request)
    {
        return Inertia::render('Admin/ManageUsers', []);
    }

    public function manageDepartments(Request $request)
    {
        return Inertia::render('Admin/ManageDepartments', []);
    }

    public function manageDocAccess(Request $request)
    {
        return Inertia::render('Admin/ManageDocumentAccess', []);
    }

    public function viewDocument(Request $request, $doc_id)
    {
        $document = Document::where('id', $doc_id)->with(['department', 'user'])->first();
        $documentList = Document::where('id', '!=', $doc_id)->with(['department', 'user'])->take(5)->get();
        $document->no_views += 1;
        $document->update();
        $user = User::where('id', $request->user()->id)->with(['department'])->first();
        $permision = [
            'status' => 'granted',
            'messages' => []
        ];
        $document->access_granted = true;

        // If User is an administrator, Bypass all the permissions
        if ($user->role == 'admin') {
            return Inertia::render('Admin/Document', [
                'document' => $document,
                'document_list' => $documentList,
                'permision' => $permision
            ]);
        } else {
            // If users is a student or staff, then check if the document allows permissions
            if ($document->department_only == true) {
                if ($document->department_id != $user->department_id) {
                    $permision['status'] = 'restricted';
                    array_push($permision['messages'], 'Only users in the department of ' . $document->department->name . ' are allowed to access this document.');
                }
            }

            if ($document->request_access == true) {
                $document->access_granted = $this->checkIfAccessGranted($user, $document);
            }

            return Inertia::render('Admin/Document', [
                'document' => $document,
                'document_list' => $documentList,
                'permision' => $permision
            ]);
            
        }
    }

    private function checkIfAccessGranted($user, $document) {
        if (AccessRequest::where('user_id', $user->id)->where('document_id', $document->id)->exists()) {
            $access = AccessRequest::where('user_id', $user->id)->where('document_id', $document->id)->first();
            return $access->permission;
        } else {
            return 'no_permission';
        }
        
    }

}
