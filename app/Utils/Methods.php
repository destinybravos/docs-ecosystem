<?php 
namespace App\Utils;

use App\Models\AccessRequest;
use App\Models\Document;
use App\Models\User;
use App\Notifications\UserNotification;

class Methods
{
    public static function sendNotification(User $user, User $notifier, $message, $data, $link, $type) 
    {
        $data = [
            'link' => $link,
            'type' => $type,
            'message' => $message,
            'user' => [
                'id' => $notifier->id,
                'name' => $notifier->firstname . " " . $notifier->lastname,
                'avatar' => $notifier->avatar
            ],
            'data_id' => $data->id,
            'notify_data' => $data
        ];

        $user->notify(new UserNotification($data));
    }

    public static function RequestAccessNotification(AccessRequest $access) 
    {
        $user = User::where('id', $access->user_id)->first();
        $document = Document::where('id', $access->document_id)->first();
        $author = User::where('id', $document->uploaded_by)->first();
        $message = $user->firstname . " is reqesting access to the document <strong>" . $document->doc_name . "</strong>.";
        $link = env('APP_URL', 'https://docs-ecosystem.com.ng/') . '/manage-document-access';
        self::sendNotification($author, $user, $message, $access, $link, "Access Request");
    }

    public static function UpdateAccessNotification(AccessRequest $access) 
    {
        $user = User::where('id', $access->user_id)->first();
        $document = Document::where('id', $access->document_id)->first();
        $author = User::where('id', $document->uploaded_by)->first();
        if ($access->permission == 'granted') {
            $message = "<span class='text-green-600'>Permission was granted for <strong>" . $document->doc_name . "</strong>.</span>";
        } else {
            $message = "<span class='text-red-500'>Permission was denied for <strong>" . $document->doc_name . "</strong>.</span>";
        }
        $link = env('APP_URL', 'https://docs-ecosystem.com.ng/') . '/document/view/' . $document->id;
        self::sendNotification($user, $author, $message, $access, $link, "Access Request");
    }
}
