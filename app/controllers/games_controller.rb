class GamesController < ApplicationController
$game = 1

  def hanglink
    redirect_to games_hangman_path
  end 
  def matchlink
    redirect_to games_matching_path
  end 
  def shootlink
    redirect_to games_shooting_path
  end 
  def mazelink
    redirect_to games_maze_path
  end 
  def paintlink
    redirect_to games_writing_path
  end 
  def puzzlelink
    redirect_to games_puzzle_path
  end 
  def draglink
    redirect_to games_drag_path
  end 
  def preschoolerlink
    redirect_to games_preschooler_path
  end 
    def hangman
   $speech = "يا ميمي"
   $speechy="عااااا"

            
  end

  def shooting
  end

  def matching
  end

  def maze
      
         $speech = "يا ميمي"
            $speechy="عااااا"
  end
    def puzzle
      
  
  end

    def home
     $games = request.filtered_parameters
         $game = $games['level']

  end

    def drag
      
  end

      def writing
      
  end
  def preschooler
  end
  def collect

    @hangman_path = "games_hangman_path"

  end

  def ool

 $data = request.filtered_parameters
    if($data != nil)
      $speechy = $data['speech']

    end


"#{$speechy}".to_file "ar", "app/assets/images/lalazo.mp3"

end



end