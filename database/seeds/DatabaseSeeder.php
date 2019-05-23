<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //Make Student user
        DB::table('users')->insert([
            'id' => 1,
            'firstname' => 'Fatih',
            'lastname' => 'Ertikin',
            'student_number' => 's1111187',
            'user_role' => 0,
            'email' => 'student@windesheim.nl',
            'password' => bcrypt('123456'),
            'is_active' => 1
        ]);

        //Make Admin User
        DB::table('users')->insert([
            'id' => 2,
            'firstname' => 'Navid',
            'lastname' => 'Haghihi',
            'student_number' => 's1235567',
            'user_role' => 1,
            'email' => 'leraar@windesheim.nl',
            'password' => bcrypt('123456'),
            'is_active' => 1
        ]);

        //Make a test module
        DB::table('modules')->insert([
            'id' => 1,
            'title' => 'C# IO',
            'description' => 'Het vak C# II gegeven door Rudy Borgstede',
            'ec' => '3',
            'is_active' => 1
        ]);

        DB::table('modules')->insert([
            'id' => 2,
            'title' => 'Professionele Vaardigheden II',
            'description' => 'Persoonlijke ontwikkeling en sociale skills, gegeven door Martijn Suikerbuik',
            'ec' => '3',
            'is_active' => 1
        ]);

        //make a test assignment belong to module defined above
        DB::table('assignments')->insert([
            'id' => 1,
            'title' => 'Opdracht Voerum',
            'description' => 'Een digitale koelkast gemaakt in ASP.NET',
            'module_id' => '1',
        ]);

        DB::table('assignments')->insert([
            'id' => 2,
            'title' => 'Opdracht Koelkast',
            'description' => 'Windows applicatie gemaakt met WPF. Een digitale magnetron gemaakt in WPF',
            'module_id' => '1',
        ]);

        DB::table('assignments')->insert([
            'id' => 3,
            'title' => 'POP Verslag',
            'description' => 'Een verslag over persoonlijke ontwikkeling gedurende de opleiding ADSD',
            'module_id' => '2',
        ]);

        DB::table('assignments')->insert([
            'id' => 4,
            'title' => 'Pitch presentatie',
            'description' => 'Een korte presentatie over de opleiding ADSD',
            'module_id' => '2',
        ]);

        DB::table('titles')->insert([
            'id' => 1,
            'title' => '💰 God father',
            'price' => 250,
        ]);

        DB::table('titles')->insert([
            'id' => 2,
            'title' => '👸 Princess',
            'price' => 250,
        ]);

        DB::table('titles')->insert([
            'id' => 3,
            'title' => '🤓 Nerd',
            'price' => 75,
        ]);

        DB::table('titles')->insert([
            'id' => 4,
            'title' => '👳🏻‍ Haci',
            'price' => 990,
        ]);

        DB::table('titles')->insert([
            'id' => 5,
            'title' => '🧙‍ ALI BABA',
            'price' => 15,
        ]);
        factory(App\User::class, 40)->create();
    }
}
