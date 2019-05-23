<?php

namespace App\Http\Resources;

use App\Http\Resources\Assignment;
use Illuminate\Http\Resources\Json\JsonResource;

class Student extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'student_number' => $this->student_number,
            'email' => $this->email,
            'title' => $this->title->title,
            'assignments' => Assignment::collection($this->whenLoaded('assignments'))
        ];
    }
}
