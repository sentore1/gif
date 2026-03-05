const SUPABASE_URL = 'https://jhvixutxsfslcuqsmmha.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impodml4dXR4c2ZzbGN1cXNtbWhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDIxMDU4NiwiZXhwIjoyMDg1Nzg2NTg2fQ.lL-oGlpjhYlwxsReLfrixc13PcJTVgRdn14O14OHdus';

async function getUsers() {
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      }
    });
    
    const data = await response.json();
    
    console.log('\n=== USERS IN DATABASE ===\n');
    if (data.users && data.users.length > 0) {
      data.users.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Created: ${user.created_at}`);
        console.log('');
      });
    } else {
      console.log('No users found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getUsers();
