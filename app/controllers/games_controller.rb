class GamesController < ApplicationController

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
  end

    def drag
      
  end

      def writing
      
  end
  def preschooler
  end

  def ool

 $data = request.filtered_parameters
    if($data != nil)
      $speechy = $data['speech']

    end

"#{$speechy}".to_file "ar", "app/assets/images/lalazy.mp3"

end



end