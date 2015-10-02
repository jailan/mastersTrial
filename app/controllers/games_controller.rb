class GamesController < ApplicationController
$mygame = 1
$letter = 2
$myshootstage = 3
$mydragstage = 3

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
      @temphang = $letter
   $speech = "يا ميمي"
   $speechy="عااااا"

            
  end



  def matching
     @tempmatch = $letter
  end

  def maze
    @tempmaze = $letter
      
         $speech = "يا ميمي"
            $speechy="عااااا"
  end
    def puzzle
      @temppuzzle = $letter
      
  
  end
    def shooting
     @shootstageno = $myshootstage
     @tempshoot= $letter
    $shootz = request.filtered_parameters
    $myshootstage = $shootz['myshootstage']


  end

      def drag
      @dragstageno = $mydragstage
      @tempdrag = $letter
     $dragz = request.filtered_parameters
    $mydragstage = $dragz['mydragstage']
  
  end

  def collect
    @temphome =  $mygame
    $letterz = request.filtered_parameters
    $letter = $letterz['letter']
  end

    def home

    $gamez = request.filtered_parameters
    $mygame = $gamez['level']
    @tempo =  $mygame


  end



      def page1
          @dragstageno = $mydragstage
      @temppage1 = $letter
         $dragz = request.filtered_parameters
    $mydragstage = $dragz['mydragstage']
  end

      def writing
        @tempwrite = $letter
      
  end
  def preschooler
    @temppreschooler = $letter
  end


  def ool

 $data = request.filtered_parameters
if($data != nil)
      $speechy = $data['speech']

    end


"#{$speechy}".to_file "ar", "app/assets/images/lalazo.mp3"

end



end