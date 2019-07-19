var mongoose = require('mongoose');
var User = require('../models/users');
var Recruiter = require('../models/recruiters');
var Job = require('../models/jobs');
var Request = require('../models/requests');
var CompanyReview = require('../models/companyReview');
var UserReview = require('../models/userReview');
mongoose.set('useFindAndModify', false);

exports.init = function () {
    // Add some jobseeker samples
    var jobseeker1 = new User({
        first_name: 'Mickey',
        last_name: 'Mouse',
        email: '111111@disney.com',
        password: 'ad1d8ce3070f0d783818e82c14bea6b6', // password: 123456
        description: 'I am Mickey Mouse, I am friendly, positive and honest, and good at studying and programming!' +
            ' I am Mickey Mouse, I am friendly, positive and honest, and good at studying and programming!',
        job_field: 'IT',
        cv: '/upload/users/cv/cv1.jpg',
        avatar: '/upload/users/avatar/1.jpg'
    });

    var jobseeker2 = new User({
        first_name: 'Minnie',
        last_name: 'Mouse',
        email: '222222@disney.com',
        password: 'f5dfeac5879ad11d8ffceb45ea621c07',// password: 12345678
        description: 'I am Minnie Mouse, I am finding a job, I am Minnie Mouse, I am finding a job,I am Minnie Mouse' +
            ' I am Minnie Mouse, I am Minnie Mouse, I am Minnie Mouse, I am Minnie Mouse, I am Minnie Mouse',
        job_field: 'Other Jobs',
        cv: '/upload/users/cv/cv2.jpg',
        avatar: '/upload/users/avatar/2.jpg'
    });

    User.deleteMany({})
        .then(function () {
            // save information of jobseekers
            jobseeker1.save();
            jobseeker2.save();
        });

    // add some recruiter samples
    var recruiter1 = new Recruiter({
        first_name: 'Peter',
        last_name: 'Pan',
        email: '333333@disney.com',
        password: 'ad1d8ce3070f0d783818e82c14bea6b6', // password: 123456
        description: 'We are hiring! We look forward to your joining! We are hiring! We look forward to your joining!' +
            'We are hiring! We look forward to your joining! We are hiring! We look forward to your joining!' +
            'We are hiring! We look forward to your joining! We are hiring! We look forward to your joining! ',
        job_field: 'Human Resources',
        avatar: '/upload/users/avatar/3.jpg',
        company_name: 'Peter Pan Company',
        address: 'Leeds, West Yorkshire',
        contact_num: 666666,
        employees_num: 100,
        photos: ['/upload/users/companyImg/photo12.jpg', '/upload/users/companyImg/photo11.jpg',
            '/upload/users/companyImg/photo10.jpg','/upload/users/companyImg/photo9.jpg',
            '/upload/users/companyImg/photo8.jpg','/upload/users/companyImg/photo7.jpg']
    });

    var recruiter2 = new Recruiter({
        first_name: 'Snow',
        last_name: 'White',
        email: '444444@disney.com',
        password: 'f5dfeac5879ad11d8ffceb45ea621c07',// password: 12345678
        description: 'We are hiring! We look forward to your joining! We are hiring! We look forward to your joining!' +
            'We are hiring! We look forward to your joining! We are hiring! We look forward to your joining!' +
            'We are hiring! We look forward to your joining! We are hiring! We look forward to your joining! ',
        job_field: 'Human Resources',
        avatar: '/upload/users/avatar/4.jpg',
        company_name: 'Snow White Company',
        address: 'SW2, South West London',
        contact_num: 888888,
        employees_num: 200,
        photos: ['/upload/users/companyImg/photo1.jpg', '/upload/users/companyImg/photo2.jpg',
            '/upload/users/companyImg/photo3.jpg','/upload/users/companyImg/photo4.jpg',
            '/upload/users/companyImg/photo5.jpg','/upload/users/companyImg/photo6.jpg',
            '/upload/users/companyImg/photo7.jpg','/upload/users/companyImg/photo8.jpg']
    });

    Recruiter.deleteMany({})
        .then(function () {
            recruiter1.save();
            recruiter2.save();
        });

    // add some posted jobs samples
    var jobs = [];
    jobs.push(new Job({
        email: '333333@disney.com',
        company: 'Peter Pan Company',
        position: 'editor',
        location: 'Liverpool',
        description: 'Responsibilities: 1. Responsible for planning and writing product promotion copy and commodity advertising copy, copywriting ideas for various promotion and marketing planning programs; 2. Promoting copywriting for online publicity platform; 3. Responsible for the collection and organization of advertising materials',
        companyImage: '/upload/users/avatar/3.jpg',
        salary: ['£15,000', '£20,000'],
        field: 'Editorial Jobs',
        date: new Date('2019-5-1'),
        jobType: 'Part-time'
    }));
    jobs.push(new Job({
        email: '444444@disney.com',
        company: 'Snow White Company',
        position: 'editor',
        location: 'SW2, South West London',
        description: 'Responsibilities: 1. Responsible for planning and writing product promotion copy and commodity advertising copy, copywriting ideas for various promotion and marketing planning programs; 2. Promoting copywriting for online publicity platform; 3. Responsible for the collection and organization of advertising materials',
        companyImage: '/upload/users/avatar/4.jpg',
        salary: ['£16,000', '£18,000'],
        field: 'Editorial Jobs',
        date: new Date('2019-1-3'),
        jobType: 'Graduate'
    }));
    jobs.push(new Job({
        email: '333333@disney.com',
        company: 'Peter Pan Company',
        position: 'Web Developer',
        location: 'Leeds, West Yorkshire',
        description: 'job requirements:\n' +
            '\n' +
            '1 Master the HTML/CSS/Javascript language;\n' +
            '\n' +
            '2 master Bootstrap, Backbone, Less, JQuery and other front-end development framework; familiar with the front-end popular framework experience is preferred.\n' +
            '\n' +
            '3 have a deeper understanding of browser compatibility, web semantics',
        companyImage: '/upload/users/avatar/3.jpg',
        salary: ['£20,000', '£25,000'],
        field: 'IT',
        date: new Date('2018-5-31'),
        jobType: 'Graduate'
    }));
    jobs.push(new Job({
        email: '444444@disney.com',
        company: 'Snow White Company',
        position: 'Web Developer',
        location: 'Edinburgh',
        description: 'job requirements:\n' +
            '1. Can independently complete multi-end (pc, mobile) web front-end H5 development, can solve the compatibility problems of mainstream browsers in the market, and have a deeper understanding of website design;\n' +
            '2. Proficient in CSS3, native JS, familiar with ES6, at least proficient in a front-end class library, such as jQuery, Zepto, etc.;\n' +
            '3. Understand the front-end separation technology, at least familiar with a back-end language (java/php/python/golang, etc.)',
        companyImage: '/upload/users/avatar/4.jpg',
        salary: ['£20,000', '£25,000'],
        field: 'IT',
        date: new Date('2019-5-11'),
        jobType: 'Internship'
    }));
    jobs.push(new Job({
        email: '333333@disney.com',
        company: 'Peter Pan Company',
        position: 'Web Developer',
        location: 'Leeds, West Yorkshire',
        description: 'job requirements:\n' +
            '\n' +
            '1 More than three years of work experience;\n' +
            '\n' +
            '2 master Bootstrap, Backbone, Less, JQuery and other front-end development framework; familiar with the front-end popular framework experience is preferred.\n' +
            '\n' +
            '3 have a deeper understanding of browser compatibility, web semantics',
        companyImage: '/upload/users/avatar/3.jpg',
        salary: ['£25,000', '£30,000'],
        field: 'IT',
        date: new Date('2018-8-23'),
        jobType: 'Graduate'
    }));
    jobs.push(new Job({
        email: '333333@disney.com',
        company: 'Peter Pan Company',
        position: 'Java Developer',
        location: 'Birmingham',
        description: 'Job Responsibilities:\n' +
            '1. Responsible for leading the team, complete each module design, framework construction, coding work according to product requirements, complete and realize functional requirements.\n' +
            '2, according to daily development and online problems, analyze the problem, customize the solution to ensure the stability and security of the system.\n' +
            '3. Participate in product demand analysis and participate in technical implementation design, and give clear development plans and plans for product requirements.',
        companyImage: '/upload/users/avatar/3.jpg',
        salary: ['£30,000', '£35,000'],
        field: 'IT',
        date: new Date('2019-4-2'),
        jobType: 'Graduate'
    }));
    jobs.push(new Job({
        email: '444444@disney.com',
        company: 'Snow White Company',
        position: 'Java Developer',
        location: 'Sheffield, South Yorkshire',
        description: 'Job Responsibilities:\n' +
            '1. Responsible for leading the team, complete each module design, framework construction, coding work according to product requirements, complete and realize functional requirements.\n' +
            '2, according to daily development and online problems, analyze the problem, customize the solution to ensure the stability and security of the system.\n' +
            '3. Participate in product demand analysis and participate in technical implementation design, and give clear development plans and plans for product requirements.',
        companyImage: '/upload/users/avatar/4.jpg',
        salary: ['£30,000', '£35,000'],
        field: 'IT',
        date: new Date('2019-5-31'),
        jobType: 'Graduate'
    }));
    jobs.push(new Job({
        email: '444444@disney.com',
        company: 'Snow White Company',
        position: 'Java Developer',
        location: 'Sheffield, South Yorkshire',
        description: 'Job Responsibilities:\n' +
            '1. Five or more years of work experience.\n' +
            '2, according to daily development and online problems, analyze the problem, customize the solution to ensure the stability and security of the system.\n' +
            '3. Participate in product demand analysis and participate in technical implementation design, and give clear development plans and plans for product requirements.',
        companyImage: '/upload/users/avatar/4.jpg',
        salary: ['£35,000', '£38,000'],
        field: 'IT',
        date: new Date('2019-3-17'),
        jobType: 'Part-time'
    }));
    jobs.push(new Job({
        email: '333333@disney.com',
        company: 'Peter Pan Company',
        position: 'Java Developer',
        location: 'City of London, London',
        description: 'Job Responsibilities:\n' +
            '1. Bachelor degree or above, major in computer science;\n' +
            '2. 3 years of experience in Java development in the Internet industry, a solid Java knowledge system, familiar with Java EE, Redis, MQ, and a deep understanding of various open source frameworks such as Spring, SpringMVC, MyBatis, etc.;\n' +
            '3. Leading or participating in the e-commerce main process module including merchandise, shopping cart, promotion, settlement, order priority;',
        companyImage: '/upload/users/avatar/3.jpg',
        salary: ['£28,000', '£30,000'],
        field: 'IT',
        jobType: 'Internship'
    }));

    Job.deleteMany({})
        .then(function () {
            jobs.forEach(function (value) {
                value.save();
            })
        });

    // add some posted jobs samples
    var requests = [];
    requests.push(new Request({
        email: '111111@disney.com',
        name: 'Mickey Mouse',
        title: 'UI designer',
        location: 'Leeds, West Yorkshire',
        description: 'Proficient in Photoshop, Illustrator, Coreldraw, Flash\n' +
            'Learn about the computer language Html, Css, Javascript, I am looking for an internship, welcome to contact!',
        cv: '/upload/requests/cv1.jpg',
        salary: ['£5,000', '£6,000'],
        field: 'IT',
        jobType: 'Internship',
        date: new Date('2019-5-10')
    }));
    requests.push(new Request({
        email: '222222@disney.com',
        name: 'Minnie Mouse',
        title: 'UI designer',
        location: 'Leeds, West Yorkshire',
        description: 'Proficient in Photoshop, Illustrator, Coreldraw, Flash\n' +
            'Learn about the computer language Html, Css, Javascript, I am looking for a part time job!',
        cv: '/upload/requests/cv2.jpg',
        salary: ['£5,000', '£7,000'],
        field: 'IT',
        jobType: 'Part-time',
        date: new Date('2019-5-16')
    }));
    Request.deleteMany({})
        .then(function () {
            requests.forEach(function (value) {
                value.save();
            })
        });

    // add some company reviews samples
    var companyReviews = [];
    companyReviews.push(new CompanyReview({
        rating: '5',
        title: 'a gooooood company',
        Review: 'This is the best company I have ever been, how can it be so good?',
        posted: true,
        company: '333333@disney.com',
        author: '111111@disney.com'
    }));
    companyReviews.push(new CompanyReview({
        rating: '4',
        title: 'Good',
        Review: 'Hahahahaha! I like this company!',
        posted: true,
        company: '333333@disney.com',
        author: '222222@disney.com'
    }));
    companyReviews.push(new CompanyReview({
        rating: '5',
        title: 'Good',
        Review: 'Perfect, this is a wonderful place!',
        posted: true,
        company: '444444@disney.com',
        author: '111111@disney.com'
    }));
    companyReviews.push(new CompanyReview({
        rating: '4',
        title: 'Nice!',
        Review: 'A nice company!!!',
        posted: true,
        company: '444444@disney.com',
        author: '222222@disney.com'
    }));
    companyReviews.push(new CompanyReview({
        rating: '5',
        title: 'Wonderful',
        Review: 'The boss is so beautiful!!!!!!',
        posted: false,
        company: '444444@disney.com',
        author: '222222@disney.com'
    }));
    companyReviews.push(new CompanyReview({
        rating: '5',
        title: 'Perfect',
        Review: 'What a perfect company!!',
        posted: false,
        company: '333333@disney.com',
        author: '111111@disney.com'
    }));
    CompanyReview.deleteMany({})
        .then(function () {
            companyReviews.forEach(function (value) {
                value.save();
            })
        });

    // add some employee reviews samples
    var employeeReviews = [];
    employeeReviews.push(new UserReview({
        rating: '5',
        title: 'a gooooood developer',
        Review: 'Mickey is so smart and friendly, glad to have him in my company!',
        posted: true,
        author: '333333@disney.com',
        employee: '111111@disney.com'
    }));
    employeeReviews.push(new UserReview({
        rating: '5',
        title: 'Pefect',
        Review: 'Hahahahaha! I like her!',
        posted: true,
        author: '333333@disney.com',
        employee: '222222@disney.com'
    }));
    employeeReviews.push(new UserReview({
        rating: '5',
        title: 'Good',
        Review: 'He is a really good guy!',
        posted: true,
        author: '444444@disney.com',
        employee: '111111@disney.com'
    }));
    employeeReviews.push(new UserReview({
        rating: '4',
        title: 'Nice!',
        Review: 'How nice she is!!!',
        posted: true,
        author: '444444@disney.com',
        employee: '222222@disney.com'
    }));
    employeeReviews.push(new UserReview({
        rating: '5',
        title: 'Wonderful',
        Review: 'She is very elegant and beautiful!!!!!!',
        posted: false,
        author: '444444@disney.com',
        employee: '222222@disney.com'
    }));
    employeeReviews.push(new UserReview({
        rating: '5',
        title: 'Perfect',
        Review: 'What a perfect talent!!',
        posted: false,
        author: '333333@disney.com',
        employee: '111111@disney.com'
    }));
    UserReview.deleteMany({})
        .then(function () {
            employeeReviews.forEach(function (value) {
                value.save();
            })
        });

}


