<?php

use App\Http\Controllers\LivroController;
use App\Http\Controllers\IdadeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('idades')->name('idades.')->namespace('Idades')->group(function () {
    Route::get('/', [IdadeController::class, 'index']);
    Route::get('/{id}', [IdadeController::class, 'show']);
    Route::post('/', [IdadeController::class, 'create']);
    Route::put('/{id}', [IdadeController::class, 'update']);
    Route::delete('/{id}', [IdadeController::class, 'destroy']);
});

Route::prefix('livro')->name('livro.')->namespace('Livro')->group(function () {
    Route::get('livros', [LivroController::class, 'index']);
    Route::get('livros/{id}', [LivroController::class, 'show']);
    Route::post('livros', [LivroController::class, 'create']);
    Route::put('livros/{id}', [LivroController::class, 'update']);
    Route::delete('livros/{id}', [LivroController::class, 'destroy']);
});





