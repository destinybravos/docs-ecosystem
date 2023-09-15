<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $casts = [
        'files' => 'array',
        'department_only' => 'boolean',
        'request_access' => 'boolean',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'uploaded_by');
    }
}
