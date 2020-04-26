class PokemonsController < ApplicationController
  require "faker"

  def index 
    pokemons = Pokemon.all 
    render json: PokemonSerializer.new(pokemons)
  end

  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    
    if trainer && trainer.pokemons.count < 6
      pokemon = trainer.pokemons.create(nickname: name, species: species, trainer_id: trainer.id)
    end
  end

  def destroy 
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy 
  end

end
