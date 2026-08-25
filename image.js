// DEVARA AATA Image Generation Functionality

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const imageGallery = document.getElementById('image-gallery');
  const generateImageBtn = document.getElementById('generate-image-btn');

  // State
  let currentGod = '';
  let currentStory = '';

  // Initialize
  function init() {
    // Set up event listeners
    if (generateImageBtn) {
      generateImageBtn.addEventListener('click', handleGenerateImage);
    }
  }

  // Handle generate image button click
  function handleGenerateImage() {
    // Get current god and story from chat (in real implementation, this would come from state management)
    // For demo, we'll extract from the last assistant message
    const lastAssistantMessage = document.querySelector('.message.assistant:last-child');
    if (!lastAssistantMessage) {
      alert('Please ask about a god first to generate an image.');
      return;
    }

    // Extract god name from the message (simplified)
    const messageText = lastAssistantMessage.textContent;
    currentGod = extractGodName(messageText);
    if (!currentGod) {
      alert('Could not determine which god to illustrate. Please ask about a specific god.');
      return;
    }

    // Show loading state on button
    const originalText = generateImageBtn.textContent;
    generateImageBtn.textContent = 'Generating...';
    generateImageBtn.disabled = true;

    // Simulate image generation API call
    setTimeout(() => {
      // Reset button
      generateImageBtn.textContent = originalText;
      generateImageBtn.disabled = false;

      // Generate image URL (in real implementation, this would come from backend API)
      const imageUrl = generateImageUrl(currentGod);

      // Add image to gallery
      addImageToGallery(imageUrl, currentGod);

      // Show success message
      showToast(`Image of ${currentGod} generated!`);
    }, 2000); // Simulate generation delay
  }

  // Generate image URL based on god name
  function generateImageUrl(godName) {
    // In a real implementation, this would call a backend service
    // that uses Stable Diffusion, DALL-E, or similar AI image service
    const seed = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${godName.toLowerCase()}-${seed}/400/300`;
  }

  // Add image to gallery
  function addImageToGallery(imageUrl, godName) {
    if (!imageGallery) return;

    // Create image item
    const imageItem = document.createElement('div');
    imageItem.classList.add('image-item');

    // Create image element
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `Illustration of ${godName}`;
    img.loading = "lazy";

    // Create caption
    const caption = document.createElement('div');
    caption.classList.add('image-caption');
    caption.textContent = `${godName}`;

    // Create actions
    const actions = document.createElement('div');
    actions.classList.add('image-actions');

    // View button
    const viewBtn = document.createElement('button');
    viewBtn.innerHTML = '👁️';
    viewBtn.title = 'View full size';
    viewBtn.addEventListener('click', () => {
      window.open(imageUrl, '_blank');
    });

    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.innerHTML = '💾';
    downloadBtn.title = 'Download image';
    downloadBtn.addEventListener('click', () => {
      downloadImage(imageUrl, `${godName.toLowerCase()}_illustration.jpg`);
    });

    // Share button
    const shareBtn = document.createElement('button');
    shareBtn.innerHTML = '📤';
    shareBtn.title = 'Share image';
    shareBtn.addEventListener('click', () => {
      navigator.share ? navigator.share({
        title: `${godName} Illustration`,
        text: `Check out this illustration of ${godName} from DEVARA AATA`,
        url: imageUrl
      }).catch(console.error) : alert('Sharing not supported in this browser.');
    });

    actions.appendChild(viewBtn);
    actions.appendChild(downloadBtn);
    actions.appendChild(shareBtn);

    // Assemble image item
    imageItem.appendChild(img);
    imageItem.appendChild(caption);
    imageItem.appendChild(actions);

    // Add to gallery (prepend to show latest first)
    imageGallery.prepend(imageItem);
  }

  // Download image function
  function downloadImage(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Extract god name from message (simplified)
  function extractGodName(message) {
    const gods = [
      'ganesha', 'ganesh', 'shiva', 'vishnu', 'brahma', 'devi', 'durga',
      'lakshmi', 'saraswati', 'krishna', 'rama', 'hanuman', 'kali',
      'murugan', 'ayyappa', 'venkateshwara', 'jagannath'
    ];

    const lowerMessage = message.toLowerCase();
    for (const god of gods) {
      if (lowerMessage.includes(god)) {
        // Return properly formatted name
        return god.charAt(0).toUpperCase() + god.slice(1);
      }
    }
    return null;
  }

  // Show toast notification
  function showToast(message) {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;

    // Add to body
    document.body.appendChild(toast);

    // Remove after delay
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Initialize the image functionality
  init();
});

// Export function for use in chat.js
window.addImageToGallery = function(imageUrl, godName) {
  // This would be implemented in a real application with proper state management
  // For now, we'll just log it
  console.log(`Would add image: ${imageUrl} for ${godName}`);
};