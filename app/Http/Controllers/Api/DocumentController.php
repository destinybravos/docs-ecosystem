<?php

namespace App\Http\Controllers\Api;

use App\Models\Document;
use App\Utils\ImageUploader;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ResponseController;
use App\Models\Department;

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
            $document->files = json_encode($files);
            $document->department_id = $request->department_id;
            $document->access_level = $request->access_by;
            $document->department_only = filter_var($request->department_only, FILTER_VALIDATE_BOOL);
            
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
}
