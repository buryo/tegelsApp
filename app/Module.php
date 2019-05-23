<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    /**
     * The attributes that are mass assignable.
        *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'ec', 'photo_url', 'is_active'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function assignments()
    {
        return $this->hasMany('App\Assignment');
    }

    protected $table = 'modules';
}



