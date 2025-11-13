<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $tasks = Task::with('category')->orderBy('created_at', 'desc')->get();

            return response()->json([
                'message' => 'Daftar semua task berhasil diambil.',
                'data' => $tasks
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            // Log the exception and return a structured JSON error so the frontend can handle it gracefully
            logger()->error('Error fetching tasks: ' . $e->getMessage());

            return response()->json([
                'message' => 'Gagal memuat tugas.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validate input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_completed' => 'sometimes|boolean',
            'category_id' => 'required|exists:categories,id',
            'priority' => 'required|in:Low,Medium,High',
            'due_date' => 'nullable|date',
        ]);

        try {
            // create task
            $task = Task::create($validated);
            $task->load('category');

            return response()->json([
                'message' => 'Task berhasil dibuat.',
                'data' => $task
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal membuat task.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task tidak ditemukan.'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'message' => 'Detail task berhasil diambil.',
            'data' => $task
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Validate input
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'is_completed' => 'sometimes|boolean',
            'category_id' => 'sometimes|required|exists:categories,id',
            'priority' => 'sometimes|required|in:Low,Medium,High',
            'due_date' => 'nullable|date',
        ]);

        // Search for the task
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task tidak ditemukan.'
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Update task
            $task->update($validated);
            $task->load('category');

            return response()->json([
                'message' => 'Task berhasil diperbarui.',
                'data' => $task
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal memperbarui task.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task tidak ditemukan.'
            ], Response::HTTP_NOT_FOUND);
        }
        try {
            $task->delete();
            return response()->json([
                'message' => 'Task berhasil dihapus.'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus task.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
