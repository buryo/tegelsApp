<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssignmentsHasUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assignments_has_users', function (Blueprint $table) {
            $table->unsignedInteger('assignment_id');
            $table->foreign('assignment_id')->references('id')->on('assignments');

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');

            $table->unsignedInteger('is_checked')->default('0');
            $table->string('assignment_file')->nullable();
            $table->UnsignedInteger('is_active')->default('0');
            $table->timestamps();

            $table->unique(array('assignment_id', 'user_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assignments_has_users');
    }
}
