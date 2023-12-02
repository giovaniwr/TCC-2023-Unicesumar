<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LivroRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
             'nome' => 'required',
             'idadeId' => 'required',
             'tipo' => 'required',
             'datalancamento' => 'required',
             'autor' => 'required',
             'descricao' => 'required'
        ];
    }

    /**
     * @return array
     */
    public function messages(): array
    {
        return [
            'nome.required' => 'O campo Nome é obrigatório.',
            'tipo.required' => 'O campo Tipo é obrigatório.',
            'datalancamento.required' => 'O campo Data de lançamento é obrigatório.',
            'autor.required' => 'O campo Autor(a) é obrigatório.',
            'descricao.required' => 'O campo Descricao é obrigatório.',
        ];
    }
}
