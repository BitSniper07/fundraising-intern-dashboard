document.addEventListener("DOMContentLoaded", () => {
    // 1. Progress Bar Animation
    const progressFill = document.getElementById("progress-fill");
    const progressPercent = document.getElementById("progress-percent");
    const targetPercent = 35;
    let current = 0;
    let progressInterval;

    const animateProgress = () => {
        current = 0;
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            if (current <= targetPercent && progressFill && progressPercent) {
                progressFill.style.width = `${current}%`;
                progressPercent.textContent = `${current}%`;
                current++;
            } else {
                clearInterval(progressInterval);
            }
        }, 30);
    };

    animateProgress(); // 🔧 Start animation on load

    // 2. Card Animations (Staggered Delay)
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        if (card) {
            card.style.animationDelay = `${index * 0.1}s`;
        }
    });

    document.getElementById("addDonation").addEventListener("click", () => {
        alert("Are yo sure you want to add a new donation ?");
    });

    const notify = document.createElement("div");
    notify.innerText = "Donation successfully added!";
    notify.classList.add("toast");
    document.body.appendChild(notify);

    // 3. Timeframe Selector Change
    const timeframeSelector = document.getElementById('timeframe');
    if (timeframeSelector) {
        timeframeSelector.addEventListener('change', (e) => {
            console.log(`Timeframe changed to: ${e.target.value}`);
            animateProgress();
        });
    }

    // 4. Leaderboard Refresh Button Rotation
    const refreshBtn = document.querySelector('.btn-refresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.classList.add('rotate');
        });

        // Remove 'rotate' class after animation completes
        refreshBtn.addEventListener('animationend', () => {
            refreshBtn.classList.remove('rotate');
        });
    }

    // 5. Button Hover Lift Effect
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // 6. Update Last Login Timestamp
    const lastLoginElement = document.getElementById('last-login');
    if (lastLoginElement) {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        lastLoginElement.textContent = `Last login: ${now.toLocaleDateString('en-US', options)}`;
    }

    // 7. Timed Notification (New Donation Alert)
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-bell"></i>
            <p>New donation received!</p>
            <button class="btn-close"><i class="fas fa-times"></i></button>
        `;
        document.body.appendChild(notification);

        // Show animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Close button
        const closeBtn = notification.querySelector('.btn-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
        }
    }, 3000);

    // 8. Inject Notification Styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 1rem;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }

        .notification i.fa-bell {
            color: var(--primary-color);
            font-size: 1.2rem;
        }

        .notification p {
            margin: 0;
            font-weight: 500;
        }

        .btn-close {
            background: none;
            border: none;
            color: var(--text-light);
            cursor: pointer;
            margin-left: 1rem;
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .rotate {
            animation: rotate 1s linear;
        }
    `;
    document.head.appendChild(notificationStyle);
});

// toggle Dark mode //

document.getElementsByTagName('darkModeToggle').addEventListener('clik',function() {
    document.body.classList.toggle('dark-mode');
})
