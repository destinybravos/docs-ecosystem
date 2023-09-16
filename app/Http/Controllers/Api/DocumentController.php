<?php

namespace App\Http\Controllers\Api;

use App\Models\Document;
use App\Models\Department;
use App\Utils\ImageUploader;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ResponseController;
use App\Models\AccessRequest;

class DocumentController extends Controller
{
    use ResponseController;

    public function saveDocument(Request $request){
        $validator = Validator::make($request->all(), [
            'doc_name' => 'required|string',
            'doc_file' => 'required|array',
            'department_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Missing or invalid input parameters! Kindly check your form input and try again.', 
            $validator->errors()->all(), 422);
        }
        
        // check if the document already exists


        // Check if there is a valid file on the request object
        if ($request->hasFile('doc_file')) {
            // Get the department name
            $department = "admin";
            $queryDepartment = Department::where('id', $request->department_id)->first();
            if(!empty($queryDepartment)) {
                $department == $queryDepartment->name;
            }
            // Upload file to the server (Application Storage)
            $files = [];
            if (count($request->file('doc_file')) > 0) {
                foreach ($request->file('doc_file') as $key => $file) {
                    $fileUpload = ImageUploader::uploadFile($file, $department);
                    if ($fileUpload['status'] == true) {
                        array_push($files, $fileUpload);
                    }
                }
            } else {
                $fileUpload = ImageUploader::uploadFile($request->file('doc_file'), $department);
                if ($fileUpload['status'] == true) {
                    array_push($files, $fileUpload);
                }
            }
            
            // Saave a new copy of the document
            $document = new Document();
            $document->uploaded_by = $request->user()->id;
            $document->doc_name = $request->doc_name;
            $document->files = $files;
            $document->department_id = $request->department_id;
            $document->access_level = $request->access_by;
            $document->description = $request->description;
            $document->department_only = filter_var($request->department_only, FILTER_VALIDATE_BOOL);
            $document->request_access = filter_var($request->department_only, FILTER_VALIDATE_BOOL);
            
            if ($document->save()) {
                $documents = Document::orderBy('doc_name', 'ASC')->paginate(30);
                return $this->sendResponse('Saved sucesfully', [
                    'documents' => $documents
                ]);
            } else {
                return $this->sendError('Could not upload document due to an unexpected error.', [], 422);
            }
            
        }else{
            return $this->sendError('There is no file found to save! Kindly make sure you upload the file appropriately.', 
            [], 422);
        }

    }

    public function fetchDocuments(Request $request){
        if (isset($request->search_param) && $request->search_param !== null) {
            $documents = Document::where(function($query) use ($request){
                $query->where('doc_name', 'LIKE', '%'.$request->search_param.'%');
            })->orderBy('doc_name', 'ASC')->paginate(10);
        } else {
            $documents = Document::orderBy('doc_name', 'ASC')->paginate(10);
        }
        return $this->sendResponse('Saved sucesfully', [
            'documents' => $documents
        ]);
    }

    public function increaseDocuments(Request $request){
        $document = Document::where('id', $request->document_id)->first();
        $document->no_downloads += 1;
        $document->update();
        return $this->sendResponse('Updated sucesfully', [
            'document' => $document
        ]);
    }

    public function searchDocuments(Request $request){
        if (isset($request->search_param) && $request->search_param !== null) {
            $documents = Document::where(function($query) use ($request){
                $query->where('doc_name', 'LIKE', '%'.$request->search_param.'%');
            })->orderBy('doc_name', 'ASC')->paginate(10);
        } else {
            $documents = [];
        }
        return $this->sendResponse('Saved sucesfully', [
            'documents' => $documents
        ]);
    }

    public function requestAccess(Request $request) {
        if (!AccessRequest::where('document_id', $request->document_id)->where('user_id', $request->user()->id)->exists()) {
            $access = new AccessRequest();
            $access->document_id = $request->document_id;
            $access->user_id = $request->user()->id;
            if ($access->save()) {
                return $this->sendResponse('Saved sucesfully', [
                    'access' => $access
                ]);
            } else {
                return $this->sendError('Access request was not successful due to an unexpected error.', [], 500);
            }
        } else {
            $access = AccessRequest::where('document_id', $request->document_id)->where('user_id', $request->user()->id)->first();
            return $this->sendResponse('Saved sucesfully', [
                'access' => $access
            ]);
        }
    }

    public function fetchAccessRequest(Request $request){
        $accesses = AccessRequest::orderBy('created_at', 'DESC')->with(['user', 'document'])->get();
        return $this->sendResponse('Fetched sucesfully', [
            'accesses' => $accesses
        ]);
    }

    public function updateAccessRequest(Request $request){
        if(AccessRequest::where('id', $request->access_id)->update([
            'permission' => $request->permission
        ])){
            $accesses = AccessRequest::orderBy('created_at', 'DESC')->with(['user', 'document'])->get();
            return $this->sendResponse('updated sucesfully', [
                'accesses' => $accesses
            ]);
        }
    }
}
