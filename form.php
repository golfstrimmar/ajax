

<?php 
$email = trim($_POST['email']) ;
$phone = trim($_POST['phone']);
$name = trim($_POST['name']);
$dt = date('Y-m-d H:i:s');

if($email == '' || $phone == '' || $name == ''){
  // если Поля пустые
  echo 'Заполните  все поля';
}
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)){
  // валидация полей формы
echo 'введите корректный адрес электронной почты';
}
else{
  // Пишет данные в файл
file_put_contents('apps.txt' , "$dt $email $phone $name \n" , FILE_APPEND);
}

// Если всё хорошо выйдет единица
echo '1';
?>