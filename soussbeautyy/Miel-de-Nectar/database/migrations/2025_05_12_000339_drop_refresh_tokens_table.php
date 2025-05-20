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
        Schema::dropIfExists('refresh_tokens');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recréer la table si nécessaire
        Schema::create('refresh_tokens', function (Blueprint $table) {
            $table->id();
            $table->text('token');
            $table->timestamp('expired_at');
            $table->boolean('revoked')->default(false);
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
    }
};
