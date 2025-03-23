//import student model
const Student = require('./student.model')
const Users = require('./user.model')

//arrow function
const route = (app) => { 
    
    app.get('/test', function (req, res) {
        res.send('Hello World');
    });

    app.get('/', function (req, res) {
        res.send('Hello World')
      })
      
      app.get('/name', function (req, res) {
          res.send('My name is Arm');
        })
      
      app.get('/info', function (req, res) {
          const info = {
              name: 'Arm',
              surname: 'Sukhahuta',
              Age: 20
          }
        })
      
      app.get('/students', function (req, res) {
          var studentList = 
          [
              {
                  id: 1,
                  name: 'Arm',
                  surname: 'Sukhahuta',
                  age: 20,
                  city: 'Bangkok'
              },
              {
                  id: 2,
                  name: 'Am',
                  surname: 'Suk',
                  age: 22,
                  city: 'Chiangmai'
              },
              {
                  id: 3,
                  name: 'A',
                  surname: 'Sukha',
                  age: 25,
                  city: 'Hat Yai'
              }
          ];
          res.json(studentList);
      });
      
      
      app.post('/students', function (req,res) {
          var student = req.body;
          console.log(student);
          
      
          var studentList = [
              {
                  name: 'Arm',
                  surname: 'Sukhahuta',
                  age: 20
              },
              {
                  name: 'Am',
                  surname: 'Suk',
                  age: 22
              },
              {
                  name: 'A',
                  surname: 'Sukha',
                  age: 25
              }
          ];
      
          //add student to list
          studentList.push(student);
      
          //insert to database
      
          //db.insert(student)
      
          res.json(studentList);
      });
      
      app.delete('/students/:id', function (req, res) {
          var studentList = 
          [
              {
                  id: 1,
                  name: 'Arm',
                  age: 20,
                  city: 'Bangkok'
              },
              {
                  id: 2,
                  name: 'Am',
                  age: 22,
                  city: 'Chiangmai'
              },
              {
                  id: 3,
                  name: 'A',
                  age: 25,
                  city: 'Hat Yai'
              }
          ];
          //get id from url
          var id = req.params.id;
      
          //filter except student id
          var index = studentList.findIndex(student => student.id == id);
          
          //if not found return 404
          if (index == -1) {
              return res.status(404).json(message = "Not found");
          }
      
          //remove student from list
          studentList = studentList.filter(student => student.id != id);
      
          console.log(studentList);
      
          //return updated list
          res.json(studentList);    
      });
      
      //Rest API from database
      //Query all student
      app.get('/db/students', function (req, res) {
          try {
                  Student.findAll().then(students => {
                  res.json(students);
              });
          }
          catch (error) {
              res.status(500).json({ message: error.message });
          }
      });
      
      //Query student by id
      app.get('/db/students/:id',async function (req, res) {
      
          try{
              const id = req.params.id;
              const student = await Student.findByPk(id);
      
              if(student == null){
                  return res.status(404).json({message: 'Student not found'});
              }
      
              res.json(student);
          }
          catch (error) {
              res.status(500).json({ message: error.message });
          }
      })
      
      app.post('/db/students', function (req, res) {
          try {
                  var student = req.body;
                  console.log(student);
      
                  Student.create(student).then(student => {
                  res.json(student);
              });
          }
          catch (error) {
              res.status(500).json({ message: error.message });
          }
      });
      
      app.put('/db/students/:id', async function (req, res) {
          try {
                  const id = req.params.id;
                  var student = req.body;
                  console.log(student);
      
                  const studentExisted = await Student.findByPk(id);
      
                  if(studentExisted == null){
                  return res.status(404).json({message: 'Student not found'});
                  }
      
                  Student.update(student, {
                  where: {
                      id: req.params.id
                  }
              }).then(() => {
                  res.json(student);
              });
          }
          catch (error) {
              res.status(500).json({ message: error.message });
          }
      })
      
      app.delete('/db/students/:id', async function (req, res) {
          try {
                  const id = req.params.id;
      
                  const studentExisted = await Student.findByPk(id);
      
                  if(studentExisted == null){
                  return res.status(404).json({message: 'Student not found'});
                  }
      
                  Student.destroy({
                  where: {
                      id: req.params.id
                  }
              }).then(() => {
                  res.json({message: 'Student deleted'});
              });
          }
          catch (error) {
              res.status(500).json({ message: error.message });
          }
      })

      app.post('/login', async function (req, res) {
        try {
            var user = req.body;
            console.log(user);

            const userExisted = await Users.findOne({
                where: {
                    username: user.username,
                    password: user.password
                }
            });
                if (userExisted == null) {
                    return res.status(404).json({ message: 'User not found' });
                }
            res.json(userExisted);
        }

        catch (error) {
            res.status(500).json({ message: error.message });
        }
      });
};

module.exports = route;