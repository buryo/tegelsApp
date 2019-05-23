<?php

namespace App\Http\Resources;

use App\Assignment;
use Illuminate\Http\Resources\Json\JsonResource;

class Dashboard extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $totalAssignmentsAmount = count(Assignment::all());

        return [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'is_active' => $this->is_active,
            'assignments_count' => $this->assignments_count,
            'title' => $this->title,
            'percent' => 100 * $this->assignments_count / $totalAssignmentsAmount,
        ];
    }
}
