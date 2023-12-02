<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PreencherBanco extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('idades')->insert([
            [
                'idade' => '12',
                'updated_at' => now(),
                'created_at' => now(),
            ],
            [
                'idade' => '13',
                'updated_at' => now(),
                'created_at' => now(),
            ],
            [
                'idade' => '14',
                'updated_at' => now(),
                'created_at' => now(),
            ],

        ]);
    }
}
