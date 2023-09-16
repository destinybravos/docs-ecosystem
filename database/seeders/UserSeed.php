<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'firstname' => 'Super',
            'lastname' => 'Admin',
            'email' => 'admin@procity.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
            'account_id' => 'ADM-001'
        ]);
        
        User::create([
            'firstname' => 'Docs',
            'lastname' => 'Admin',
            'email' => 'admin@docs-ecosystem.com.ng',
            'password' => Hash::make('admin2023'),
            'role' => 'admin',
            'account_id' => 'ADM-002'
        ]);
    }
}
