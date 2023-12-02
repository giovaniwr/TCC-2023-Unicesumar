<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livro extends Model
{
    use HasFactory;
    protected $atributes =
    [
        'idadeId',
        'nome',
        'tipo',
        'datalancamento',
        'autor',
        'descricao'
    ];

    public function idade()
    {
        return $this->belongsTo(Idade::class, 'idadeId','id');
    }


}
