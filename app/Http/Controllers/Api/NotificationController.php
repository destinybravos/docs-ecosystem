<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    use ResponseController;

    public function fetch(Request $request){
        $user = User::where('id', $request->user()->id)->first();
        return $this->sendResponse("Notificaations fetched successfully", [
            'notificacions' => $user->notifications
        ]);
    }
}
