<?php

namespace App\Http\Controllers;

use App\Http\Requests\LivroRequest;
use App\Models\Livro;

class LivroController extends Controller
{
    public function index()
    {
        $livros = Livro::query()
            ->with("idade")
            ->get();

        return response()->json($livros);
    }

    public function create(LivroRequest $request)
    {
        $livro = new Livro;
        $livro->nome = $request->nome;
        $livro->idadeId = $request->idadeId;
        $livro->tipo = $request->tipo;
        $livro->datalancamento = $request->datalancamento;
        $livro->autor = $request->autor;
        $livro->descricao = $request->descricao;
        $livro->save();
        return response()->json($livro, 201);
    }

    public function show($id)
    {
        $livro = Livro::findOrFail($id);
        return response()->json($livro);
    }

    public function update(LivroRequest $request, $id)
    {
        $livro = Livro::findOrFail($id);
        $livro->nome = $request->nome;
        $livro->idadeId = $request->idadeId;
        $livro->tipo = $request->tipo;
        $livro->datalancamento = $request->datalancamento;
        $livro->autor = $request->autor;
        $livro->descricao = $request->descricao;
        $livro->save();
        return response()->json($livro);
    }

    public function destroy($id)
    {
        $livro = Livro::findOrFail($id);
        $livro->delete();
        return response()->json(null, 204);
    }
}
