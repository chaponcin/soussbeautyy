<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 60);
            $table->string('email', 60)->unique();
            $table->string('password', 80);
            $table->boolean('role')->default(0)->nullable();
            $table->string('rue', 50)->nullable();
            $table->integer('code_postal')->nullable();
            $table->string('ville', 60)->nullable();
            $table->string('pays', 30)->nullable();
            $table->integer('numero')->nullable();
            $table->integer('boite')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
