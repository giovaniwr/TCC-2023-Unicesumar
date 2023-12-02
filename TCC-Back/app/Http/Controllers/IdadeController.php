<?php

namespace App\Http\Controllers;

use App\Http\Requests\IdadeRequest;
use App\Models\Livro;
use App\Models\Idade;
use Illuminate\Http\Request;
use Throwable;

class IdadeController extends Controller
{
    public function index(Request $request)
    {
        $data = Idade::all();
        return response()->json([
            'data' => $data,
            'message' => 'Data retrieved successfully'
        ]);
    }
    public function show(Request $request, int $id)
    {
        $idade = Idade::find($id);

        if (!$idade) {
            return response()->json(['error' => 'Idade não encontrado'], 404);
        }

        return response()->json([
            "data"=>$idade
        ]);

    }

    public function create(IdadeRequest $request)
    {
        $data = $request->only([
            'idade'
        ]);
        try {

            $idadeLivro = new Idade();
            $idadeLivro->idade = $data['idade'];
            $idadeLivro->save();

            return response()->json($idadeLivro, 201);
        }catch (Throwable $exception) {
            $this->handleErrorResponse($exception);
        }
        return $this->errorResponse();

    }

    public function update(IdadeRequest $request, $id)
    {
        $data = $request->only([
            'idade'
        ]);
        try {
            $idadeLivro = Idade::find($id);

            if (!$idadeLivro) {
                return response()->json(['error' => 'Idade não encontrado'], 400);
            }

            $idadeLivro->idade = $data['idade'];
            $idadeLivro->save();

            return response()->json([
                'data' => $idadeLivro,
                'message' => 'Data updated successfully',
            ], $status = 200);
        }catch (Throwable $exception) {
            $this->handleErrorResponse($exception);
        }
        return $this->errorResponse();

    }

    public function destroy($id)
    {
        $idade = Idade::find($id);

        if (!$idade) {
            return response()->json(['error' => 'Idade não encontrado'], 404);
        }
        $livrosNoIdade = Livro::query()
        ->where('idadeId','=',$idade->id)
        ->count();

        if($livrosNoIdade > 0) {
            return response()->json(['error'=> 'Já existe um livro neste Idade'],400);
        }

        $idade->delete();

        return response()->json([
            'message' => 'Data deleted successfully'
        ]);
    }


}
