<?php 
namespace App\Utils;

use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use League\Flysystem\WhitespacePathNormalizer;

class ImageUploader
{
    const ecosystemPath = 'ecosystem/';

    public static function UploadImage($file, $path = null)
    {
        $hostUrl = env('APP_URL', 'http://127.0.0.1:8000');
        if ($path === null) {
            $path = self::ecosystemPath;
        }

        $thumbnail = $file->getClientOriginalName();
        $filename = pathinfo($thumbnail, PATHINFO_FILENAME);
        $nameToStore = str_replace(' ', '_', $filename) . '_'. time() .'.webp';
        //upload the file
        $image_resize = Image::make($file->getRealPath());
        // To resize the image to a width of 600 and constrain aspect ratio (auto height)
        $image_resize->resize(900,  null, function ($constraint) {
            $constraint->aspectRatio();
            })->encode('webp', 100);

        // create the directory with permission
        $storePath = 'app/public/' . $path . '/';
        if (!file_exists(storage_path($storePath))) {
            mkdir(storage_path($storePath), 0777, true);
        }
        $stat_path = $path . '/';
        $static_path = $hostUrl . '/storage/' . $stat_path;
        // $path = url().toString().$fileType['type'].$path;

        // Upload Image
        if($image_resize->save(storage_path($storePath . $nameToStore))){
            return [
                'status' => true,
                'name' => $nameToStore,
                'path' => $static_path,
                'type' => 'image',
                'ext' => 'webp',
            ];
        } else {
            return [
                'status' => false
            ];
        }
    }

    public static function uploadFile($file, $path = null)
    {
        //Get the Original File Name and path
        $thumbnail = $file->getClientOriginalName();
        //Get the filename only using native php 'pathinfo'
        $filename = pathinfo($thumbnail, PATHINFO_FILENAME);

        $hostUrl = env('APP_URL', 'http://127.0.0.1:8000');

        // Check file type before saving
        $fileType = self::checkFileType($file);

        // If file is an image, save it as webp format
        if ($fileType['type'] === 'image') {
            //prepare the file to be stored
            $nameToStore = str_replace(' ', '_', $filename) . '_'. time() .'.webp';
            //upload the file
            $image_resize = Image::make($file->getRealPath());
            // To resize the image to a width of 600 and constrain aspect ratio (auto height)
            $image_resize->resize(900,  null, function ($constraint) {
                $constraint->aspectRatio();
                })->encode('webp', 100);

            // create the directory with permission
            $storePath = 'app/public/' . self::ecosystemPath .$fileType['type']. 's/' .$path . '/';
            if (!file_exists(storage_path($storePath))) {
                mkdir(storage_path($storePath), 0777, true);
            }
            $stat_path = self::ecosystemPath . $fileType['type']. 's/' .$path . '/';
            $static_path = $hostUrl . '/storage/' . $stat_path;

            // Upload Image
            if($image_resize->save(storage_path($storePath . $nameToStore))){
                return [
                    'status' => true,
                    'name' => $nameToStore,
                    'path' => $static_path,
                    'type' => 'image',
                    'ext' => $fileType['ext'],
                ];
            } else {
                return [
                    'status' => false
                ];
            }
        }else{
        // If file is a document, retain its extension
        // if ($fileType['type'] === 'document') {
            // Save file
            $nameToStore = str_replace(' ', '_', $filename) . '_'. time() . '.' . $fileType['ext'];

            // create the directory with permission
            $static_path = self::ecosystemPath . $fileType['type'] . 's/' .$path;
            $path = 'public/' . self::ecosystemPath . $fileType['type'] . 's/' .$path;

            if (!file_exists(storage_path($path))) {
                mkdir(storage_path($path), 0777, true);
            }
            $filepath = $file->storeAs(
                $path, $nameToStore
            );
            $static_path = $hostUrl . '/storage/' . $static_path . '/';
            return [
                'status' => true,
                'name' => $nameToStore,
                'path' => $static_path,
                'type' => $fileType['type'],
                'ext' => $fileType['ext'],
            ];
        }
    }

    public static function checkFileType($file)
    {
        $ext = strtolower($file->getClientOriginalExtension());
        if ($ext == 'jpg' || $ext == 'jpeg' || $ext == 'png' || $ext == 'gif' || $ext == 'webp' || $ext == 'tiff') {
            $type = 'image';
        }elseif($ext == 'pptx' || $ext == 'ppt' || $ext == 'docx' || $ext == 'doc' || $ext == 'pdf' || $ext == 'xlsx' || $ext == 'xls'){
            $type = 'document';
        }elseif($ext == 'mp4' || $ext == '3gp' || $ext == 'wav'){
            $type = 'video';
        }else{
            $type = 'file';
        }
        return [
            'type' => $type,
            'ext' => $ext
        ];
    }
}


?>