<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idade extends Model
{
    use HasFactory;
    protected $appends =
        [
            'totalDev'
        ];
    protected $atributes =
        [
            'idade'
        ];

    public function livros()
    {
        return $this->hasMany(Livro::class, "idadeId","id");
    }
    public function getTotalDevAttribute(){
        return $this->livros()->count();
    }

}
