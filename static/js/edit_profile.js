function showToast(msg, type) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast show' + (type ? ' ' + type : '');
  setTimeout(() => { toast.className = 'toast'; }, 2200);
}

async function loadProfileForEdit() {
  try {
    const response = await fetch("/get_contacts");
    const data = await response.json();

    document.getElementById('editFamilyContact1Input').value = data.family_contact1 || '';
    document.getElementById('editFamilyContact2Input').value = data.family_contact2 || '';
    document.getElementById('editFamilyContact3Input').value = data.family_contact3 || '';

    document.getElementById('editDoctorMobileInput').value = data.doctor_contact || '';

    document.getElementById('editFamilyEmail1Input').value = data.family_email1 || '';
    document.getElementById('editFamilyEmail2Input').value = data.family_email2 || '';
    document.getElementById('editFamilyEmail3Input').value = data.family_email3 || '';

    // User Email
    const emailInput = document.getElementById('editEmailInput');

    if (emailInput) {
      emailInput.value = data.email || '';
    }

    console.log("EMAIL SET TO INPUT =", emailInput.value);

  } catch (err) {
    console.error("Error loading profile:", err);
  }
}

document.addEventListener('DOMContentLoaded', loadProfileForEdit);

function saveEditProfile() {

  const form = document.querySelector('form');

  if (!form) {
    showToast('⚠️ Form not found', 'red');
    return;
  }

  const formData = new FormData(form);

  console.log("EMAIL BEING SENT =", formData.get("email"));

  fetch("/save_profile", {
    method: "POST",
    body: formData
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Profile update failed");
    }

    return res.text();
  })
  .then(() => {
    showToast('✅ Profile updated', 'green');

    setTimeout(() => {
      window.location.href = '/main';
    }, 900);
  })
  .catch(err => {
    console.error(err);
    showToast('⚠️ Could not update profile', 'red');
  });
}


document.addEventListener('DOMContentLoaded', loadProfileForEdit);
