// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB (change URI if using MongoDB Atlas)
mongoose.connect('mongodb://127.0.0.1:27017/adminDB')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error connecting to MongoDB:", err));

// Define Admin Schema
const adminSchema = new mongoose.Schema({
    admin_id: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    department: { type: String, required: true }
});

// Create Admin Model (Collection: 'admins')
const Admin = mongoose.model('Admin', adminSchema);

// Define the root route
app.get('/', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'welcome.html')));
});

app.get('/home', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'home.html')));
});

app.get('/video1', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'video1.mp4')));
});

app.get('/video2', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'video2.mp4')));
});

app.get('/video3', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'video3.mp4')));
});

app.get('/video4', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'video4.mp4')));
});

app.get('/video5', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'video5.mp4')));
});

app.get('/campus', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'campus.mp4')));
});

app.get('/aboutUS', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'aboutUS.html')));
});

app.get('/contactUS', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'contactUS.html')));
});

// Define the  route
app.get('/adminlog', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'admin-login.html')));
});

app.get('/Adminhome', (req, res) => {
    const { name, admin_id, department } = req.query;
    console.log(name, admin_id, department);
    // Send a basic response (this can be an HTML page or a view)
    res.sendFile(path.join(__dirname, 'src/views', 'Adminhome.html'));
    console.log("going to home");
});

app.get('/AdminAddTeacher', (req, res) => {
    // Send a basic response (this can be an HTML page or a view)
    res.sendFile(path.join(__dirname, 'src/views', 'adminaddtech.html'));
    console.log("going to addtech");
});

app.get('/enewspaper', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'e-paper.html')));
});

app.get('/mathrubhumi', (req, res) => {
    // res.send('Welcome to the Admin Portal');
    res.sendFile((path.join(__dirname, 'src/views', 'mathrubhumi.jpg')));
});

const addTeacherSchema = new mongoose.Schema({
    teacher_name: { type: String, required: true },
    emp_id: { type: String, required: true },
    subject: { type: String, required: true },
    contact_no: { type: String, required: true }

    
});

const addStudSchema = new mongoose.Schema({
    student_name: { type: String, required: true },
    emp_id: { type: String, required: true },
    subject: { type: String, required: true },
    contact_no: { type: String, required: true }

    
});
// Create a model collection addTeach
const AddTeacher = mongoose.model('Addteache', addTeacherSchema);
const Students = mongoose.model('Student', addStudSchema);



app.get('/RemTeacher', (req, res) => {
    // Send a basic response (this can be an HTML page or a view)
    res.sendFile(path.join(__dirname, 'src/views', 'adminremteach.html'));
    console.log("going to remtech");
});

app.get('/RemStd', (req, res) => {
    // Send a basic response (this can be an HTML page or a view)
    res.sendFile(path.join(__dirname, 'src/views', 'adminremstd.html'));
    console.log("going to rem std");
});

app.get('/viewstd', (req, res) => {
    // Send a basic response (this can be an HTML page or a view)
    res.sendFile(path.join(__dirname, 'src/views', 'view-students.html'));
    console.log("going to remstd");
});

app.get('/viewteach', (req, res) => {
    // Send a basic response (this can be an HTML page or a view)
    res.sendFile(path.join(__dirname, 'src/views', 'view-teacher.html'));
    console.log("going to remteacher");
});

app.post('/Teachsubmit', async (req, res) => {
    const { teacher_name, emp_id, subject, contact_no } = req.body;

    // Check if all fields are present
    if (!teacher_name || !emp_id || !subject || !contact_no) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        const newTeacher = new AddTeacher(req.body);
        await newTeacher.save();
        res.json({ success: true, message: "Teacher added successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to add the teacher. Please try again." });
    }
});

app.post('/RemTeacher', async (req, res) => {
    const { emp_id } = req.body;  // Destructuring emp_id from req.body
    console.log(req.body);        // Should now correctly
    console.log("I am in post");

    try {
        // Delete the teacher based on emp_id
        const admin = await AddTeacher.deleteOne({ emp_id });

        if (admin.deletedCount === 0) {
            return res.json({ success: false, message: 'Invalid User' });
        } else {
            res.json({ success: true, message: "Teacher removed successfully!" });
        }

    } catch (err) {
        res.json({ success: false, message: 'Server Error' });
    }
});

app.post('/RemStd', async (req, res) => {
    const { emp_id } = req.body;  // Destructuring emp_id from req.body
    console.log(req.body);        // Should now correctly
    console.log("I am in post");

    try {
        // Delete the teacher based on emp_id
        const admin = await Students.deleteOne({ emp_id });

        if (admin.deletedCount === 0) {
            return res.json({ success: false, message: 'Invalid User' });
        } else {
            res.json({ success: true, message: "Student removed successfully!" });
        }

    } catch (err) {
        res.json({ success: false, message: 'Server Error' });
    }
});

// Admin Login Route (to validate credentials)
app.post('/adminlog', async (req, res) => {
    const { admin_id, password } = req.body;
    console.log(req.body);

    try {
        // Find admin in the database by admin_id
        const admin = await Admin.findOne({ admin_id: admin_id, password: password });

        if (!admin) {
            return res.json({ success: false, message: 'Invalid User' });
        }
        else {
            //res.json({success:true});
            return res.json({ success: true, redirectUrl: `/Adminhome?name=${admin.name}&admin_id=${admin.admin_id}&department=${admin.department}` });
        }


    } catch (err) {
        res.json({ success: false, message: 'Server Error' });
    }
});

//View teachers:
// Add a new route to fetch all teachers
app.get('/api/teachers', async (req, res) => {
    try {
        // Fetch all teachers from the database
        const teachers = await AddTeacher.find();
        res.json(teachers); // Send the teachers data as a JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch teachers' });
    }
});

//View students:
// Add a new route to fetch all teachers
app.get('/api/students', async (req, res) => {
    try {
        // Fetch all teachers from the database
        const students = await Students.find();
        res.json(students); // Send the teachers data as a JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch students' });
    }
});


//Add students:
// Add this POST route for student submission
app.post('/addStudent', async (req, res) => {
    const { student_name, emp_id, subject, contact_no } = req.body;

    // Check if all fields are present
    if (!student_name || !emp_id || !subject || !contact_no) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        const newStudent = new Students(req.body);
        await newStudent.save();
        res.json({ success: true, message: "Student added successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to add the student. Please try again." });
    }
});
// Route to serve the student form page
app.get('/addStudent', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views', 'adminaddstd.html'));
   
    console.log("Navigating to the Add Student page");
});

//Remove Students:




// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
