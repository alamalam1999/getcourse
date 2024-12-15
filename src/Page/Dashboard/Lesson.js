import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/styles.css';
import Sidebar from '../../components/user/Sidebar';
import Navbar from '../../components/user/Navbar';
import Header from '../../components/user/Header';
import { useNavigate, useLocation } from 'react-router-dom';

function Lesson() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, userId } = location.state || {};
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-user');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/lesson/user/${userId}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLessons(data);
      } catch (err) {
        console.error('Error fetching lessons:', err);
      }
    };

    if (courseId && userId) fetchLesson();
  }, [courseId, userId]);

  if (!courseId || !userId) {
    return <p>Some required parameters are missing.</p>;
  }

  return (
    <div className="d-flex">
      <div className="custom-sidebar" style={{ width: '250px', minWidth: '250px' }}>
        <Sidebar />
      </div>
      <div className="flex-grow-1">
        <Navbar />
        <Header />
        <div className="p-4">
          <h2>Lessons for Course ID: {courseId}</h2>
          {lessons.length > 0 ? (
            <div className="row">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="col-md-6 mb-4">
                  <div className="card">
                    <img
                      src={lesson.course.thumbnail_url}
                      className="card-img-top"
                      alt="Course Thumbnail"
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{lesson.title}</h5>
                      <p className="card-text">{lesson.content}</p>
                      <p className="text-muted">
                        Part of course: <strong>{lesson.course.title}</strong>
                      </p>
                      <p>Category: {lesson.course.category}</p>
                      <p>Price: ${lesson.course.price}</p>
                      <h6>Progress:</h6>
                      {lesson.progress && lesson.progress.length > 0 ? (
                        lesson.progress.map((prog) => (
                          <p key={prog.id}>
                            {prog.progress_percentage}% completed. Last accessed:{' '}
                            {prog.last_accessed ? new Date(prog.last_accessed).toLocaleString() : 'Never'}
                          </p>
                        ))
                      ) : (
                        <p>No progress recorded.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No lessons available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lesson;
