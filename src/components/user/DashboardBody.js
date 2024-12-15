import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function DashboardBody() {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) return; // Ensure user data exists

      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

        const response = await fetch(`http://127.0.0.1:8000/api/enrollments/user/${user.id}`, {
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
        setEnrollments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user]);

  if (!user) return <p>No user data found.</p>;
  if (loading) return <p>Loading enrollments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2>Your Courses</h2>

      <div className="mt-4">
        <h4>Enrollments</h4>
        <div>
          {enrollments.length > 0 ? (
            <div className="row">
              {enrollments.map((enrollment) => (
                <div className="col-md-4 mb-3" key={enrollment.id}>
                  <div
                    className="card p-3 shadow"
                    onClick={() =>
                      navigate('/lesson', { state: { 
                        courseId: enrollment.course_id ,
                        userId: enrollment.user_id
                      } })
                    }
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                  >
                    <h5>
                      Course: <strong>{enrollment.course?.title}</strong>
                    </h5>
                    {enrollment.course?.thumbnail_url && (
                      <img
                        src={enrollment.course.thumbnail_url}
                        alt={`${enrollment.course.title} Thumbnail`}
                        style={{ width: '100%', height: '80%', borderRadius: '8px' }}
                      />
                    )}
                    <p>Deskripsi: {enrollment.course?.description}</p>
                    <p>
                      <h6>Status: {enrollment.status}</h6>
                      Enrollment Date:{' '}
                      <strong>{new Date(enrollment.enrollment_date).toLocaleDateString()}</strong>
                    </p>
                    <p>
                      <a href="#">Check Payment</a>
                    </p>
                    <p>
                      <h6>
                        Instructor: <strong>{enrollment.course?.instructor_id}</strong>
                      </h6>
                      Category: <strong>{enrollment.course?.category}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No enrollments found for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardBody;
