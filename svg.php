
    <?php
   $svgText = $_POST['svgText'];
   header('Content-type: image/svg+xml');
   header('Content-Disposition: attachment; filename="Cover.svg"'); 
   print "$svgText";
?>