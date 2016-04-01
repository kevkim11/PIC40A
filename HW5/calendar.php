<!-- #!/usr/local/bin/php --> <!-- remember to comment this line back in when uploading onto the pic server-->
<?php print'<?xml version = "1.0" encoding="utf-8"?>'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>HW 5</title>
  <link rel="stylesheet" type="text/css" href="calendar.css" />
</head>
<body>


<?php
  date_default_timezone_set('America/Los_Angeles'); //Initialize the time zone
  //Variables
  $names = array("Kevin", "Marko", "Evan");
  $current_ts = time();
  $todays_date = date("D, F d, Y, h:i a", time());
  $hours_to_show = 12;
  $current_hr = date("h", $current_ts);
  $ampm = date("a", $ts);
  // $ampm = "am";
  // echo $ampm;
  if($ampm=="pm"){
    $current_hr+=12;
  }
  function get_hour_string($ts){
    $hour = date("h", $ts);
    global $ampm;
    // $hour = date(":i a", $ts);
    if ($hour!="10" && $hour!="11" && $hour!="12"){
      $hour = substr($hour,  1, 1);
    }
    $hour = $hour.":00".$ampm;
    return $hour;
  }

  
  // echo $todays_date;
  // main function
  echo "<div class='container'>\n";
  echo "<h1>Bruin Family Schedule for ", $todays_date,"</h1>\n";
  echo "<table id='event_table'>\n";
  echo "\t\t<tr>\n";
  echo"\t\t\t<th class='hr_td_'> &nbsp; </th>";

  for ($i=0; $i<count($names);$i++){
    echo" <th class='table_header'>$names[$i]</th>";
  }
  echo "\n";
  // echo "Current hour is $current_hr";
  echo "\t\t</tr>\n";
  for($hr = $current_hr; $hr <($current_hr+$hours_to_show+1); $hr++){
    $ts = mktime($hr,0,0,0,0,0);
    $hour = get_hour_string($ts);
    if($hr%2==0){
      $row_class = '"even_row"';
    }
    else {
      $row_class = '"odd_row"';
    }
    echo "\t<tr class=",$row_class,">\n";
        echo "\t\t<td class='hr_td'>";
        echo $hour;
        echo "</td>"; 
        for ($i=0; $i<count($names);$i++){
          echo"<td></td>";
        }
        echo "\n";
    echo "\t</tr>\n";
  }
  echo "\n";
  echo "</table>\n";
  echo "</div>\n";
  // echo $current_ts;
?>
</body>
</html>