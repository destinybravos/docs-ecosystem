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
}
