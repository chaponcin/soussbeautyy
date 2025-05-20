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
        Schema::create('livraisons', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('id_commande');
            $table->unsignedBigInteger('id_adresse');
            $table->date('date_livraison');
            $table->foreign('id_commande')->references('id')->on('commandes')->onDelete('cascade');
            $table->foreign('id_adresse')->references('id_adresse')->on('adresses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livraisons');
    }
};
