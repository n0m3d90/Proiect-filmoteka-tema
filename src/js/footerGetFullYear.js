const footerGetFullYear = () => {
    const yearSpan = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  };

  export { footerGetFullYear };