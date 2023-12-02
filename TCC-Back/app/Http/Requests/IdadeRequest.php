<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IdadeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'idade' => 'required | max:255 ' ,
        ];
    }

    /**
     * @return array
     */
    public function messages(): array
    {
        return [
            'idade.required' => 'O campo idade é obrigatório.',
        ];
    }
}
