const Employee =require('../model/emp');
//getemployee details
exports.getUsers = async (request, response) => {
  try {
    const emp = await Employee.find();
    // response.status(200).send(emp);
    response.status(200).send({
      status: 200,
      response: emp,
    });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
//insert data
exports.addUsers = async (request, response) => {
  if (
    !request.body.emp_name ||
    !request.body.emp_role ||
    !request.body.emp_email ||
    !request.body.emp_salary ||
    !request.body.id
  ) {
    return res.status(422).json({
      status: 422,
      user: {
        emp_name: "Name is required",
        emp_role: "role is required",
        emp_email: "email is required",
        emp_salary: "salary is required",
        id: "id is required",
      },
    });
  }
  const user = request.body;
  const newUser = new Employee(user);
  try {
    await newUser.save();
    response.status(201).json({ status: 201, message: "created successfull" });
  } catch (error) {
    if (error.code === 1100) {
      response.status(409).send({
        status: 409,
        message: "Email alrdy exists",
      });
    } else {
      response.status(500).send({
        status: 500,
        message: `Something wen't wrong`,
      });
    }
  }
};

// Get a user by id
exports. getUserById = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await Employee.findById(id);
      res.status(200).send({
        status: 200,
        response: user,
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: `Something wen't wrong`,
      });
    }
};

// Save data of edited user in the database
exports.editUser = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await Employee.findByIdAndUpdate(id, req.body, {
        new: true,
        useFindAndModify: false,
      });
      if (!user) {
        return res.status(500).send({
          status: 500,
          message: `user not found with id ${id}`,
        });
      }
      res.status(200).send({
        status: 200,
        message: "Update successfully",
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).send({
          status: 409,
          message: "Email already exists",
        });
      } else {
        res.status(500).send({
          status: 500,
          message: `Something wen't wrong`,
        });
      }
    }
};

// deleting data of user from the database
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await Employee.findByIdAndRemove(id, {
        useFindAndModify: false,
      });
      if (!user) {
        return res.status(500).send({
          status: 500,
          message: `user not found with id ${id}`,
        });
      }
      res.status(200).send({
        status: 200,
        message: "Delete successfully",
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: `Something wen't wrong`,
      });
    }
};

// export const searchuser = async (req, res) => {
//   const { q } = req.query;
//   const keys = ["name", "username", "email"];
//   const search = (data) => {
//     return data.filter((item) =>
//       keys.some((key) => item[key].toLowerCase().includes(q))
//     );
//   };
//   q ? res.json(await User.find(search)) : res.json(await User.find());
//   //   q ? res.json(search(User)) : res.json(User);
// };
