<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            //$table->unsignedInteger('id')->primary();
            $table->increments('id');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('student_number');
            $table->string('avatar')->nullable();
            $table->unsignedInteger('user_role')->default(0);
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->unsignedInteger('is_active')->default(1);
            $table->integer('credits')->default(0);

            $table->string('title_id')->nullable();
            $table->foreign('title_id')->references('id')->on('title')->onDelete('cascade');
            
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
