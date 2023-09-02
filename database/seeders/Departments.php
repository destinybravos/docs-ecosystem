<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Departments extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Faculty::create([
            'name' => 'Engineering',
        ]);

        Department::create([
            'name' => 'Mechanical Engineering',
            'faculty_id' => 1
        ]);
        Department::create([
            'name' => 'Mechatronics Engineering',
            'faculty_id' => 1
        ]);
        Department::create([
            'name' => 'Student Affairs Management',
            'type' => 'administrative'
        ]);
    }
}
