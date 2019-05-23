<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'modules_id'
    ];

    protected $table = 'assignments';

    public function modules()
    {
        return $this->belongsTo('App\Module');
    }

    public function users()
    {
        return $this->belongsToMany('App\User', 'assignments_has_users');
    }
}
