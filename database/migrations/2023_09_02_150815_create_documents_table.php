<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->enum('access_level', ['all', 'admin', 'non_ac_staff', 'ac_staff', 'all_staff'])->default('all');
            $table->foreignId('uploaded_by');
            $table->boolean('department_only')->default(true);
            $table->foreignId('department_id')->nullable();
            $table->enum('file_type', ['image', 'video', 'document'])->default('document');
            $table->string('file_extension');
            $table->string('file_url');
            $table->string('thumbnail_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
