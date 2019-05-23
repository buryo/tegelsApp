<?php

namespace App\Http\Resources;

use App\Http\Resources\Assignment;
use Illuminate\Http\Resources\Json\JsonResource;

class Module extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'ec' => $this->ec,
            'photo_url' => $this->photo_url,
            'is_active' => (bool)$this->is_active ,
            'assignments' => Assignment::collection($this->whenLoaded('assignments')),
        ];
    }
}
