import { useState } from 'react';
import { useLocation } from 'wouter';
import { auth, db } from '@/lib/firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import styles from '@/app/support/support.module.css';

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // 1. Check if the email is invited
      const inviteRef = doc(db, 'invitations', formData.email.toLowerCase());
      const inviteSnap = await getDoc(inviteRef);

      if (!inviteSnap.exists()) {
        setError('This email is not authorized to sign up. Please contact an administrator.');
        setLoading(false);
        return;
      }

      const inviteData = inviteSnap.data();

      // 2. Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // 3. Update profile and create user document in Firestore
      await updateProfile(user, { displayName: formData.name || inviteData.name });
      
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: formData.name || inviteData.name,
        role: inviteData.role || 'user',
        createdAt: new Date().toISOString(),
      });

      // 4. Delete the invitation
      await deleteDoc(inviteRef);

      // 5. Redirect to dashboard or support
      setLocation('/support');
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={`glass ${styles.loginBox}`} onSubmit={handleSignup}>
        <h1 className={styles.loginTitle}>Create <span className="text-grad">Account</span></h1>
        
        {error && <p style={{ color: '#ff4d4d', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</p>}
        
        <div className={styles.field}>
          <label>Full Name</label>
          <input 
            type="text" 
            required 
            value={formData.name} 
            onChange={e => setFormData({ ...formData, name: e.target.value })} 
            placeholder="John Doe" 
          />
        </div>
        
        <div className={styles.field}>
          <label>Email Address</label>
          <input 
            type="email" 
            required 
            value={formData.email} 
            onChange={e => setFormData({ ...formData, email: e.target.value })} 
            placeholder="name@example.com" 
          />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input 
            type="password" 
            required 
            value={formData.password} 
            onChange={e => setFormData({ ...formData, password: e.target.value })} 
            placeholder="Min. 8 characters" 
          />
        </div>

        <div className={styles.field}>
          <label>Confirm Password</label>
          <input 
            type="password" 
            required 
            value={formData.confirmPassword} 
            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} 
            placeholder="Repeat password" 
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <p style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account? <a href="/support" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Login</a>
        </p>
      </form>
    </div>
  );
}
