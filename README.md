# WUSTL Course Manager

## Table of Contents

1. [About](#about)
2. [Setup](#setup)
   1. [Django & React setup](#django-&-react-setup)
   2. [React Native setup](#react-native-setup)
3. [Use](#use)
   1. [Django admin panel](#django-admin-panel)
   2. [Regular frontend](#regular-frontend)
   3. [REST API](#rest-api)
4. [Making changes](#making-changes)
   1. [Django & React changes](#django-&-react-changes)
   2. [React Native changes](#react-native-changes)
5. [Some resources I used](#some-resources-i-used)

## About

This project was created to be [choibc97's](https://github.com/choibc97) Master's Project (WUSTL 2019). The project is made up of 3 components: a Django backend, a React web frontend, and a React Native cross-platform mobile frontend. The frontend communicates with the backend using a REST API created with the Django Rest Framework (DRF). The `CheckoutMobile` directory contains all of the code related to the mobile frontend, while the `coursemanager` directory contains all of the code related to the backend and web frontend. All of the web frontend code can be found under `coursemanager/frontend`. Currently, a demo of this project is hosted on http://masters.benjaminchoi.com.

## Setup

### Django & React setup

Before setting up this project, you will need:

1. Server space (e.g. [AWS](https://aws.amazon.com/), [DigitalOcean](https://www.digitalocean.com/), etc.)
2. A domain ([namecheap](https://www.namecheap.com/), [Google Domains](https://domains.google.com/), etc.)

Once you have server space and a domain available, you must link your domain to your server. In order to do so, follow [this DigitalOcean guide](https://www.digitalocean.com/docs/networking/dns/quickstart/) or search for an equivalent guide for your cloud service provider of choice.

When you are done, run the setup script via: `sudo source ./setup.sh`

Keep the following in mind when running the setup script:

- It should be done on the server space where you plan to host your domain, not on your local machine
- The setup script presumes a Linux environment, more specifically a Debian distribution of Linux (Ubuntu specifically), meaning it will attempt to use apt to install relevant packages and bash for execution
- The setup script presumes you created a firewall on your domain using UFW (check out [this DigitalOcean article](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) to learn how to do so)
- You will periodically be prompted for input at various stages
- The setup script only works to get the web frontend and backend working, it does not do anything for the mobile app (something you should be working with locally anyways, as opposed to on the server)

### React Native setup

Any work with the React Native portion of the repo (anything under `CheckoutMobile`) should be done locally. Before doing anything else, you will need to tell the app where to make requests by pointing it to your domain. To do so, navigate to `CheckoutMobile/actions` and create a new file `domain.js`. Under this file, append the following line: `export const DOMAIN = '{DOMAIN}';`, making sure to replace `{DOMAIN}` with your domain. As an example, for the demo of this project, the line should look like this: `export const DOMAIN = 'http://masters.benjaminchoi.com';`.

After that, check [these docs](https://facebook.github.io/react-native/docs/getting-started) to continue.

Keep the following in mind while going through the docs:

- Follow the instructions under "React Native CLI Quickstart"
- Stop when you hit the "Creating a new application" section
- Run the following command from the base directory: `cd CheckoutMobile && npm i && cd ios && pod install && cd ..`
- Resume the guide from "Running you React Native application"

## Use

When running the setup script, a superuser should be created by default. After that, there are 2 ways to interact with Course Manager: through the Django admin panel or through the regular frontend, each having different use cases.

### Django admin panel

You should only make changes using the Django admin panel for 3 primary use cases: giving users staff status, editing your name as a superuser, and deleting users. For all other use cases, interaction with the regular frontend is encouraged in order to ensure object creation and modification behaves as expected.

### Regular frontend

The frontend is restricted according to two factors: staff status and the role you hold within a specific course. Only content relevant to you is displayed on the frontend. For example, only staff users have the ability to create a course. However, once a course is created, adding non-staff users as instructors will give those users the ability to control that course at will. TAs do not have the power to modify any part of the course _except_ student assignments. Students do not have any write permissions whatsoever and have limited read permissions. The content the REST API serves to students also fundamentally differs from the content served to instructors and TAs. For example, instructors are served up more details of the TAs' user objects than students, who are only given a name and an email. This means that not only is the view restricted according to user status, but so is the API and its contents.

### REST API

These are all of the API URL endpoints, what the endpoints expect as input, and what you should expect as output. Pay attention to trailing slashes, as they are significant.

| URL endpoint                 | Request method | Authorization token in header? | Permissions                    | Input                                                                                                                              | Output                                                                                                                                      |
| ---------------------------- | -------------- | ------------------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| /api/auth/login              | POST           | No                             | Any                            | `data: {email, password}`                                                                                                          | `{user, token: auth token, instructor_courses, ta_courses, student_courses}`                                                                |
| /api/auth/register           | POST           | No                             | Any                            | `data: {token: registration invitation token, email, first_name, last_name}`                                                       | `{user, token: auth token, instructor_courses, ta_courses, student_courses}`                                                                |
| /api/auth/user               | GET            | Yes                            | Any                            | N/A                                                                                                                                | `{user, instructor_courses, ta_courses, student_courses}`                                                                                   |
| /api/auth/logout             | POST           | Yes                            | Authenticated                  | `null`                                                                                                                             | N/A                                                                                                                                         |
| /api/register_invitation     | GET            | No                             | Any                            | `params: {token: registration invitation token`                                                                                    | `{recipient, token}`                                                                                                                        |
| /api/courses/                | POST           | Yes                            | Staff                          | `data: {course_id: string, title: string, instructors: emails, tas: emails, students: emails}`                                     | `{id, course_id, title, instructors, tas, students}`                                                                                        |
| /api/courses/                | GET            | Yes                            | Staff                          | N/A                                                                                                                                | `[{id, course_id, title, instructors, tas, students}]`                                                                                      |
| /api/courses/{id}/           | DELETE         | Yes                            | Staff, Instructor              | N/A                                                                                                                                | N/A                                                                                                                                         |
| /api/courses/{id}/           | GET            | Yes                            | Staff, Instructor              | N/A                                                                                                                                | `{id, course_id, title, instructors, tas, students}`                                                                                        |
| /api/courses/{id}/           | PATCH          | Yes                            | Staff, Instructor              | `{...}`                                                                                                                            | `{id, course_id, title, instructors, tas, students}`                                                                                        |
| /api/assignment_groups/      | POST           | Yes                            | Staff, Instructor              | `data: {course: course object's id (not course_id), title: string, points: int}`                                                   | `{id, course, title, points}`                                                                                                               |
| /api/assignment_groups/      | GET            | Yes                            | Staff, Instructor, TA, Student | N/A                                                                                                                                | `[{id, course, title, points}]`                                                                                                             |
| /api/assignment_groups/{id}/ | DELETE         | Yes                            | Staff, Instructor              | N/A                                                                                                                                | N/A                                                                                                                                         |
| /api/assignment_groups/{id}/ | GET            | Yes                            | Staff, Instructor, TA, Student | N/A                                                                                                                                | `{id, course, title, points}`                                                                                                               |
| /api/assignment_groups/{id}/ | PATCH          | Yes                            | Staff, Instructor              | `data: {...}`                                                                                                                      | `{id, course, title, points}`                                                                                                               |
| /api/assignments/            | POST           | Yes                            | Staff, Instructor              | `data: {course: course object's id (not course_id), group: assignment group's id, title: string, points: int, due_date: datetime}` | `{id, course, group, title, points, due_date}`                                                                                              |
| /api/assignments/            | GET            | Yes                            | Staff, Instructor, TA, Student | N/A                                                                                                                                | `[{id, course, group, title, points, due_date}]`                                                                                            |
| /api/assignments/{id}/       | DELETE         | Yes                            | Staff, Instructor              | N/A                                                                                                                                | N/A                                                                                                                                         |
| /api/assignments/{id}/       | GET            | Yes                            | Staff, Instructor, TA          | N/A                                                                                                                                | `{id, course, group, title, points, due_date}`                                                                                              |
| /api/assignments/{id}/       | PATCH          | Yes                            | Staff, Instructor              | `data: {...}`                                                                                                                      | `{id, course, group, title, points, due_date}`                                                                                              |
| /api/student_assignments     | GET            | Yes                            | Staff, Instructor, TA, Student | `params: {student: email, assignment: assignment's id}`                                                                            | `{id, student, qr_code: string, completed: bool, points_earned: float, timestamp: datetime, is_late: bool, grader: email, comment: string}` |
| /api/student_assignments     | PATCH          | Yes                            | Staff, Instructor, TA          | `params: {student, assignment}`                                                                                                    | `{id, student, qr_code, completed, points_earned, timestamp, is_late, grader, comment}`                                                     |

## Making changes

### Django & React changes

Although you can make changes locally, you will need to upload those changes to the server if you want it reflected on your domain. In order to make changes, you will need 2 terminal windows open SSH'd into the root project directory on your server.

On the first window, run either: `npm run dev` or `npm run build`. The former is meant for development, running in the background and dynamically reflecting your changes. The latter is meant for production, running only once to reflect the final build.

Either way, in order to ultimately see the changes reflected on the domain, you will need to serve up the static content generated by React. To do so, first activate your python environment by running the following command: `source env/bin/activate`. Then, navigate to the `coursemanager` directory and collect static content with the following command: `cd coursemanager && python manage.py collectstatic`.

If you make any changes to the Django backend, you will most likely need to restart Gunicorn to see those changes reflected. To do so, simply run the following command: `sudo systemctl restart coursemanager-gunicorn`.

### React Native changes

As mentioned previously, you should only make changes to the React Native portion of the project locally. In order to see your changes reflected, simply make sure Metro is running (it should automatically start to run when the emulator launches). You can also turn on [hot reloading](https://facebook.github.io/react-native/docs/fast-refresh) to see your changes reflected dynamically.

## Some resources I used

- [Creating a custom user model](https://testdriven.io/blog/django-custom-user-model/)
- [Sending emails with django](https://medium.com/@_christopher/how-to-send-emails-with-python-django-through-google-smtp-server-for-free-22ea6ea0fb8e)
- [Password validation with DRF](https://stackoverflow.com/questions/36414804/integrate-django-password-validators-with-django-rest-framework-validate-passwor)
