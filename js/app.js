// Default Services Data
const defaultServices = [
    { desc: 'Basic Business Website (up to 5 pages)', rate: 8000 },
    { desc: 'Standard Business Website (up to 10 pages)', rate: 15000 },
    { desc: 'Professional Business Website (up to 15 pages)', rate: 25000 },
    { desc: 'E-commerce Website', rate: 35000 },
    { desc: 'Custom Web Application', rate: 50000 },
    { desc: 'Landing Page Design', rate: 3000 },
    { desc: 'School/College Website', rate: 18000 },
    { desc: 'Doctor/Clinic/Hospital Website', rate: 15000 },
    { desc: 'Coaching Institute Website', rate: 15000 },
    { desc: 'Responsive UI/UX Design', rate: 5000 },
    { desc: 'Contact Form Integration', rate: 1000 },
    { desc: 'WhatsApp Integration', rate: 1000 },
    { desc: 'Google Maps Integration', rate: 500 },
    { desc: 'Basic SEO Setup', rate: 3000 },
    { desc: 'Website Content Upload', rate: 2000 },
    { desc: 'Additional Website Page', rate: 1000 },
    { desc: 'Website Maintenance', rate: 2000 },
    { desc: 'Website Redesign', rate: 8000 }
];

const defaultAdditional = [
    { desc: 'SSL Certificate', rate: 1500 },
    { desc: 'Business Email Setup', rate: 1000 },
    { desc: 'Website Backup', rate: 1000 },
    { desc: 'Website Security', rate: 2000 },
    { desc: 'Website Migration', rate: 3000 },
    { desc: 'Website Speed Optimization', rate: 2500 },
    { desc: 'Payment Gateway Integration', rate: 3000 },
    { desc: 'WhatsApp Business Integration', rate: 1500 },
    { desc: 'Annual Maintenance Contract', rate: 5000 },
    { desc: 'Content Writing', rate: 500 },
    { desc: 'Training and Handover', rate: 1000 },
    { desc: 'Custom Development', rate: 5000 }
];

// State
let state = {
    company: {
        name: 'CISN – Software & Website Development Services',
        address: 'Plot No. 97, Shop No. 13, CHS-5, Navi Mumbai, Bipex Rd, Sector 5, Savoli, Ghansoli, Mumbai, Maharashtra 400701.',
        phone: '',
        email: '',
        website: 'https://cisn.in/',
        logo: ''
    },
    client: {
        name: '', contact: '', mobile: '', email: '', address: '', gst: '',
        quoteNo: 'QTN-2026-001', date: new Date().toISOString().split('T')[0], validUntil: '', projectName: '', projectDesc: ''
    },
    services: [
        { id: Date.now(), desc: 'Standard Business Website (up to 10 pages)', qty: 1, rate: 15000 }
    ],
    domain: { name: '', ext: '.com', period: 1, price: 1200 },
    hosting: { plan: 'Basic Shared Hosting', billing: 'yearly', qty: 1, price: 2000 },
    additional: [],
    payment: { discountType: 'percent', discountValue: 0, gstEnabled: 'false', gstPercent: 18, advance: 0 }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupEventListeners();
    populateSelects();
    renderServiceRows();
    renderAdditionalRows();
    updatePreview();
});

// Navigation Tabs
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.form-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
        });
    });
}

// Populate Dropdowns with default items
function populateSelects() {
    // We use inputs for services instead of selects to allow full editing
}

// Event Listeners for all inputs
function setupEventListeners() {
    // Company
    document.getElementById('logoUpload').addEventListener('change', handleLogoUpload);
    document.getElementById('comp-name').addEventListener('input', e => { state.company.name = e.target.value; updatePreview(); });
    document.getElementById('comp-phone').addEventListener('input', e => { state.company.phone = e.target.value; updatePreview(); });
    document.getElementById('comp-email').addEventListener('input', e => { state.company.email = e.target.value; updatePreview(); });
    document.getElementById('comp-address').addEventListener('input', e => { state.company.address = e.target.value; updatePreview(); });
    document.getElementById('comp-website').addEventListener('input', e => { state.company.website = e.target.value; updatePreview(); });

    // Client
    const clientFields = ['name', 'contact', 'mobile', 'email', 'address', 'gst', 'quoteNo', 'date', 'validUntil', 'projectName', 'projectDesc'];
    clientFields.forEach(field => {
        const el = document.getElementById(`cl-${field}`);
        if(el) el.addEventListener('input', e => { state.client[field] = e.target.value; updatePreview(); });
    });

    // Domain
    document.getElementById('dom-name').addEventListener('input', e => { state.domain.name = e.target.value; updatePreview(); });
    document.getElementById('dom-ext').addEventListener('change', e => {
        state.domain.ext = e.target.value;
        state.domain.price = e.target.options[e.target.selectedIndex].dataset.price;
        document.getElementById('dom-price').value = state.domain.price;
        updatePreview();
    });
    document.getElementById('dom-period').addEventListener('input', e => { state.domain.period = parseFloat(e.target.value) || 1; updatePreview(); });
    document.getElementById('dom-price').addEventListener('input', e => { state.domain.price = parseFloat(e.target.value) || 0; updatePreview(); });

    // Hosting
    document.getElementById('host-plan').addEventListener('change', e => {
        state.hosting.plan = e.target.value;
        state.hosting.price = e.target.options[e.target.selectedIndex].dataset.price;
        document.getElementById('host-price').value = state.hosting.price;
        updatePreview();
    });
    document.getElementById('host-billing').addEventListener('change', e => { state.hosting.billing = e.target.value; updatePreview(); });
    document.getElementById('host-qty').addEventListener('input', e => { state.hosting.qty = parseFloat(e.target.value) || 1; updatePreview(); });
    document.getElementById('host-price').addEventListener('input', e => { state.hosting.price = parseFloat(e.target.value) || 0; updatePreview(); });

    // Payment
    document.getElementById('pay-discountType').addEventListener('change', e => { state.payment.discountType = e.target.value; updatePreview(); });
    document.getElementById('pay-discountValue').addEventListener('input', e => { state.payment.discountValue = parseFloat(e.target.value) || 0; updatePreview(); });
    document.getElementById('pay-gstEnabled').addEventListener('change', e => { state.payment.gstEnabled = e.target.value; updatePreview(); });
    document.getElementById('pay-gstPercent').addEventListener('input', e => { state.payment.gstPercent = parseFloat(e.target.value) || 0; updatePreview(); });
    document.getElementById('pay-advance').addEventListener('input', e => { state.payment.advance = parseFloat(e.target.value) || 0; updatePreview(); });
}

// Handle Logo Upload
function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            state.company.logo = event.target.result;
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

// --- SERVICES RENDERING ---
function renderServiceRows() {
    const tbody = document.getElementById('services-body');
    tbody.innerHTML = '';
    
    state.services.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" value="${item.desc}" onchange="updateService(${item.id}, 'desc', this.value)"></td>
            <td><input type="number" value="${item.qty}" min="1" style="width: 60px;" onchange="updateService(${item.id}, 'qty', this.value)"></td>
            <td><input type="number" value="${item.rate}" min="0" onchange="updateService(${item.id}, 'rate', this.value)"></td>
            <td class="amount-display">₹${(item.qty * item.rate).toLocaleString('en-IN')}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeService(${item.id})"><i class="fa-solid fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

function addServiceRow() {
    state.services.push({ id: Date.now(), desc: 'Custom Service', qty: 1, rate: 0 });
    renderServiceRows();
    updatePreview();
}

function updateService(id, field, value) {
    const item = state.services.find(s => s.id === id);
    if (item) {
        item[field] = field === 'desc' ? value : (parseFloat(value) || 0);
        renderServiceRows(); // Re-render to update amount
        updatePreview();
    }
}

function removeService(id) {
    state.services = state.services.filter(s => s.id !== id);
    renderServiceRows();
    updatePreview();
}

// --- ADDITIONAL SERVICES RENDERING ---
function renderAdditionalRows() {
    const tbody = document.getElementById('additional-body');
    tbody.innerHTML = '';
    
    state.additional.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" value="${item.desc}" onchange="updateAdditional(${item.id}, 'desc', this.value)"></td>
            <td><input type="number" value="${item.qty}" min="1" style="width: 60px;" onchange="updateAdditional(${item.id}, 'qty', this.value)"></td>
            <td><input type="number" value="${item.rate}" min="0" onchange="updateAdditional(${item.id}, 'rate', this.value)"></td>
            <td class="amount-display">₹${(item.qty * item.rate).toLocaleString('en-IN')}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeAdditional(${item.id})"><i class="fa-solid fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

function addAdditionalRow() {
    state.additional.push({ id: Date.now(), desc: 'Additional Service', qty: 1, rate: 0 });
    renderAdditionalRows();
    updatePreview();
}

function updateAdditional(id, field, value) {
    const item = state.additional.find(s => s.id === id);
    if (item) {
        item[field] = field === 'desc' ? value : (parseFloat(value) || 0);
        renderAdditionalRows();
        updatePreview();
    }
}

function removeAdditional(id) {
    state.additional = state.additional.filter(s => s.id !== id);
    renderAdditionalRows();
    updatePreview();
}

// --- CALCULATIONS ---
function calculateTotals() {
    const devSubtotal = state.services.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const addSubtotal = state.additional.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    
    const domainTotal = state.domain.price * state.domain.period;
    const hostingTotal = state.hosting.price * state.hosting.qty;
    
    const subtotal = devSubtotal + addSubtotal + domainTotal + hostingTotal;
    
    let discount = 0;
    if (state.payment.discountType === 'percent') {
        discount = subtotal * (state.payment.discountValue / 100);
    } else {
        discount = state.payment.discountValue;
    }
    
    const taxable = subtotal - discount;
    let gst = 0;
    if (state.payment.gstEnabled === 'true') {
        gst = taxable * (state.payment.gstPercent / 100);
    }
    
    const grandTotal = taxable + gst;
    const balance = grandTotal - state.payment.advance;

    return {
        devSubtotal, addSubtotal, domainTotal, hostingTotal,
        subtotal, discount, taxable, gst, grandTotal, balance
    };
}

// --- LIVE PREVIEW ---
function updatePreview() {
    const totals = calculateTotals();
    const preview = document.getElementById('quotation-preview');
    
    let logoHtml = state.company.logo ? `<img src="${state.company.logo}" style="max-height: 60px; max-width: 150px; object-fit: contain; margin-bottom: 10px;">` : '';
    
    let html = `
        <div class="preview-header-content">
            <div class="preview-company-info">
                ${logoHtml}
                <h2>${state.company.name || 'Company Name'}</h2>
                <p>${state.company.address || 'Company Address'}</p>
                <p>${state.company.phone ? 'Phone: ' + state.company.phone : ''} ${state.company.email ? '| Email: ' + state.company.email : ''}</p>
                <p>${state.company.website || ''}</p>
            </div>
            <div class="preview-title">
                <h1>QUOTATION</h1>
            </div>
        </div>

        <div class="preview-details">
            <div class="preview-client">
                <h3>Billed To:</h3>
                <p><strong>${state.client.name || 'Client Name'}</strong></p>
                <p>${state.client.contact ? 'Attn: ' + state.client.contact : ''}</p>
                <p>${state.client.address || ''}</p>
                <p>${state.client.mobile ? 'Mobile: ' + state.client.mobile : ''} ${state.client.email ? '| Email: ' + state.client.email : ''}</p>
                ${state.client.gst ? `<p>GST: ${state.client.gst}</p>` : ''}
            </div>
            <div class="preview-meta">
                <h3>Quotation Details:</h3>
                <p><strong>Quote No:</strong> ${state.client.quoteNo || '-'}</p>
                <p><strong>Date:</strong> ${state.client.date || '-'}</p>
                <p><strong>Valid Until:</strong> ${state.client.validUntil || '-'}</p>
                <p><strong>Project:</strong> ${state.client.projectName || '-'}</p>
            </div>
        </div>
    `;

    if (state.client.projectDesc) {
        html += `<div style="margin-bottom: 20px;"><h3>Project Description</h3><p style="font-size: 9pt;">${state.client.projectDesc}</p></div>`;
    }

    // Items Table
    html += `
        <table class="preview-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th class="text-right">Qty</th>
                    <th class="text-right">Rate</th>
                    <th class="text-right">Amount</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Dev Services
    if (state.services.length > 0) {
        html += `<tr><td colspan="4" style="font-weight: bold; background: #f9f9f9;">Website Development Services</td></tr>`;
        state.services.forEach(item => {
            html += `
                <tr>
                    <td>${item.desc}</td>
                    <td class="text-right">${item.qty}</td>
                    <td class="text-right">₹${item.rate.toLocaleString('en-IN')}</td>
                    <td class="text-right">₹${(item.qty * item.rate).toLocaleString('en-IN')}</td>
                </tr>
            `;
        });
    }

    // Domain & Hosting
    if (totals.domainTotal > 0 || totals.hostingTotal > 0) {
        html += `<tr><td colspan="4" style="font-weight: bold; background: #f9f9f9;">Domain & Hosting</td></tr>`;
        if (totals.domainTotal > 0) {
            html += `
                <tr>
                    <td>Domain Registration (${state.domain.name}${state.domain.ext})</td>
                    <td class="text-right">${state.domain.period}</td>
                    <td class="text-right">₹${parseFloat(state.domain.price).toLocaleString('en-IN')}</td>
                    <td class="text-right">₹${totals.domainTotal.toLocaleString('en-IN')}</td>
                </tr>
            `;
        }
        if (totals.hostingTotal > 0) {
            html += `
                <tr>
                    <td>Hosting: ${state.hosting.plan} (${state.hosting.billing})</td>
                    <td class="text-right">${state.hosting.qty}</td>
                    <td class="text-right">₹${parseFloat(state.hosting.price).toLocaleString('en-IN')}</td>
                    <td class="text-right">₹${totals.hostingTotal.toLocaleString('en-IN')}</td>
                </tr>
            `;
        }
    }

    // Additional
    if (state.additional.length > 0) {
        html += `<tr><td colspan="4" style="font-weight: bold; background: #f9f9f9;">Additional Services</td></tr>`;
        state.additional.forEach(item => {
            html += `
                <tr>
                    <td>${item.desc}</td>
                    <td class="text-right">${item.qty}</td>
                    <td class="text-right">₹${item.rate.toLocaleString('en-IN')}</td>
                    <td class="text-right">₹${(item.qty * item.rate).toLocaleString('en-IN')}</td>
                </tr>
            `;
        });
    }

    html += `</tbody></table>`;

    // Totals
    html += `
        <div class="preview-totals">
            <table>
                <tr><td>Subtotal:</td><td class="text-right">₹${totals.subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
                <tr><td>Discount:</td><td class="text-right">- ₹${totals.discount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
                <tr><td>Taxable Amount:</td><td class="text-right">₹${totals.taxable.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
    `;
    
    if (state.payment.gstEnabled === 'true') {
        html += `<tr><td>GST (${state.payment.gstPercent}%):</td><td class="text-right">₹${totals.gst.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>`;
    }

    html += `
                <tr class="total-row"><td>Grand Total:</td><td class="text-right">₹${totals.grandTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
                <tr><td>Advance Paid:</td><td class="text-right">₹${state.payment.advance.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
                <tr><td><strong>Balance Due:</strong></td><td class="text-right"><strong>₹${totals.balance.toLocaleString('en-IN', {minimumFractionDigits: 2})}</strong></td></tr>
            </table>
        </div>
    `;

    // Terms & Conditions
    html += `
        <div class="preview-terms">
            <h4>Terms & Conditions:</h4>
            <ol style="padding-left: 15px; margin-bottom: 10px;">
                <li>50% advance payment is required to initiate the project.</li>
                <li>Remaining 50% is due upon project completion before final deployment.</li>
                <li>Domain and hosting renewal costs are payable annually and are not included in the maintenance package unless specified.</li>
                <li>Prices quoted are estimates and subject to change based on final requirements.</li>
                <li>GST applicable only if enabled and applicable by law.</li>
            </ol>
            <div style="margin-top: 40px; text-align: right;">
                <p>For <strong>${state.company.name}</strong></p>
                <br><br>
                <p>Authorized Signature</p>
            </div>
        </div>
    `;

    preview.innerHTML = html;
}

// --- PDF GENERATION ---
function downloadPDF() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert('PDF library failed to load. Please check your internet connection and reload.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const totals = calculateTotals();

    // Header Background
    doc.setFillColor(10, 37, 64); // Primary Navy
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Company Logo
    if (state.company.logo) {
        try {
            doc.addImage(state.company.logo, 'PNG', 15, 10, 30, 20, undefined, 'FAST');
        } catch(e) { console.log('Logo error:', e); }
    }

    // Company Details
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(state.company.name || 'CISN', 55, 18);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(state.company.address || '', 55, 24);
    doc.text(`${state.company.phone ? 'Ph: ' + state.company.phone : ''} ${state.company.email ? '| Email: ' + state.company.email : ''}`, 55, 29);
    doc.text(state.company.website || '', 55, 34);

    // Quotation Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('QUOTATION', pageWidth - 15, 20, { align: 'right' });

    // Client & Quote Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Billed To:', 15, 50);
    
    doc.setFont('helvetica', 'normal');
    doc.text(state.client.name || 'Client Name', 15, 56);
    doc.text(state.client.address || '', 15, 61);
    doc.text(state.client.contact ? `Attn: ${state.client.contact}` : '', 15, 66);
    doc.text(state.client.mobile ? `Mob: ${state.client.mobile}` : '', 15, 71);
    doc.text(state.client.email ? `Email: ${state.client.email}` : '', 15, 76);

    // Quote Details
    doc.setFont('helvetica', 'bold');
    doc.text('Quote No:', pageWidth - 60, 50);
    doc.text('Date:', pageWidth - 60, 56);
    doc.text('Valid Until:', pageWidth - 60, 62);
    doc.text('Project:', pageWidth - 60, 68);

    doc.setFont('helvetica', 'normal');
    doc.text(state.client.quoteNo || '-', pageWidth - 35, 50);
    doc.text(state.client.date || '-', pageWidth - 35, 56);
    doc.text(state.client.validUntil || '-', pageWidth - 35, 62);
    doc.text(state.client.projectName || '-', pageWidth - 35, 68);

    // Project Description
    let currentY = 85;
    if (state.client.projectDesc) {
        doc.setFont('helvetica', 'bold');
        doc.text('Project Description:', 15, currentY);
        doc.setFont('helvetica', 'normal');
        const splitDesc = doc.splitTextToSize(state.client.projectDesc, pageWidth - 30);
        doc.text(splitDesc, 15, currentY + 5);
        currentY += 5 + (splitDesc.length * 5);
    }

    // Table Data
    const tableBody = [];
    
    if (state.services.length > 0) {
        tableBody.push([{ content: 'Website Development Services', colSpan: 4, styles: { fontStyle: 'bold', fillColor: [243, 244, 246] } }]);
        state.services.forEach(item => {
            tableBody.push([item.desc, item.qty, `₹${item.rate.toLocaleString('en-IN')}`, `₹${(item.qty * item.rate).toLocaleString('en-IN')}`]);
        });
    }

    if (totals.domainTotal > 0 || totals.hostingTotal > 0) {
        tableBody.push([{ content: 'Domain & Hosting', colSpan: 4, styles: { fontStyle: 'bold', fillColor: [243, 244, 246] } }]);
        if (totals.domainTotal > 0) {
            tableBody.push([`Domain (${state.domain.name}${state.domain.ext})`, state.domain.period, `₹${parseFloat(state.domain.price).toLocaleString('en-IN')}`, `₹${totals.domainTotal.toLocaleString('en-IN')}`]);
        }
        if (totals.hostingTotal > 0) {
            tableBody.push([`Hosting: ${state.hosting.plan}`, state.hosting.qty, `₹${parseFloat(state.hosting.price).toLocaleString('en-IN')}`, `₹${totals.hostingTotal.toLocaleString('en-IN')}`]);
        }
    }

    if (state.additional.length > 0) {
        tableBody.push([{ content: 'Additional Services', colSpan: 4, styles: { fontStyle: 'bold', fillColor: [243, 244, 246] } }]);
        state.additional.forEach(item => {
            tableBody.push([item.desc, item.qty, `₹${item.rate.toLocaleString('en-IN')}`, `₹${(item.qty * item.rate).toLocaleString('en-IN')}`]);
        });
    }

    // Generate Table
    doc.autoTable({
        startY: currentY + 10,
        head: [['Description', 'Qty', 'Rate', 'Amount']],
        body: tableBody,
        theme: 'grid',
        headStyles: { fillColor: [10, 37, 64], textColor: 255 },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 20, halign: 'right' },
            2: { cellWidth: 30, halign: 'right' },
            3: { cellWidth: 35, halign: 'right' }
        },
        styles: { fontSize: 9 }
    });

    // Totals Box
    let finalY = doc.lastAutoTable.finalY + 10;
    
    const totalsData = [
        ['Subtotal', `₹${totals.subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}`],
        ['Discount', `- ₹${totals.discount.toLocaleString('en-IN', {minimumFractionDigits: 2})}`],
        ['Taxable Amount', `₹${totals.taxable.toLocaleString('en-IN', {minimumFractionDigits: 2})}`]
    ];

    if (state.payment.gstEnabled === 'true') {
        totalsData.push([`GST (${state.payment.gstPercent}%)`, `₹${totals.gst.toLocaleString('en-IN', {minimumFractionDigits: 2})}`]);
    }

    totalsData.push(
        ['Grand Total', `₹${totals.grandTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}`],
        ['Advance Paid', `₹${state.payment.advance.toLocaleString('en-IN', {minimumFractionDigits: 2})}`],
        ['Balance Due', `₹${totals.balance.toLocaleString('en-IN', {minimumFractionDigits: 2})}`]
    );

    doc.autoTable({
        startY: finalY,
        body: totalsData,
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
            0: { cellWidth: 40, halign: 'right' },
            1: { cellWidth: 35, halign: 'right', fontStyle: 'bold' }
        },
        margin: { left: pageWidth - 90 },
        didParseCell: function(data) {
            if (data.row.index === totalsData.length - 3) { // Grand Total row
                data.cell.styles.fontStyle = 'bold';
                data.cell.styles.textColor = [10, 37, 64];
                data.cell.styles.fontSize = 12;
            }
            if (data.row.index === totalsData.length - 1) { // Balance Due row
                data.cell.styles.fontStyle = 'bold';
            }
        }
    });

    // Terms
    finalY = doc.lastAutoTable.finalY + 15;
    
    // Check if we need a new page for terms
    if (finalY > pageHeight - 60) {
        doc.addPage();
        finalY = 20;
    }

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Terms & Conditions:', 15, finalY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const terms = [
        '1. 50% advance payment is required to initiate the project.',
        '2. Remaining 50% is due upon project completion before final deployment.',
        '3. Domain and hosting renewal costs are payable annually and are not included in the maintenance package unless specified.',
        '4. Prices quoted are estimates and subject to change based on final requirements.',
        '5. GST applicable only if enabled and applicable by law.'
    ];
    
    let termY = finalY + 5;
    terms.forEach(term => {
        doc.text(term, 15, termY);
        termY += 5;
    });

    // Signature
    doc.setFont('helvetica', 'bold');
    doc.text(`For ${state.company.name}`, pageWidth - 15, termY + 15, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.text('Authorized Signature', pageWidth - 15, termY + 30, { align: 'right' });

    // Footer Page Number
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - 15, pageHeight - 10, { align: 'right' });
        doc.text('Generated by CISN Quotation Generator', 15, pageHeight - 10);
    }

    doc.save(`CISN_Quotation_${state.client.quoteNo || 'Draft'}.pdf`);
}

// --- DRAFT SAVE / LOAD / RESET ---
function saveDraft() {
    const data = {
        company: state.company,
        client: state.client,
        services: state.services,
        domain: state.domain,
        hosting: state.hosting,
        additional: state.additional,
        payment: state.payment
    };
    localStorage.setItem('cisn_quotation_draft', JSON.stringify(data));
    alert('Draft saved successfully! Note: Do not use this for highly sensitive data.');
}

function loadDraft() {
    const saved = localStorage.getItem('cisn_quotation_draft');
    if (saved) {
        if(confirm('Are you sure you want to load the saved draft? Current data will be overwritten.')) {
            const data = JSON.parse(saved);
            state = { ...state, ...data };
            
            // Repopulate forms
            document.getElementById('comp-name').value = state.company.name;
            document.getElementById('comp-phone').value = state.company.phone;
            document.getElementById('comp-email').value = state.company.email;
            document.getElementById('comp-address').value = state.company.address;
            document.getElementById('comp-website').value = state.company.website;
            
            document.getElementById('cl-name').value = state.client.name;
            document.getElementById('cl-contact').value = state.client.contact;
            document.getElementById('cl-mobile').value = state.client.mobile;
            document.getElementById('cl-email').value = state.client.email;
            document.getElementById('cl-address').value = state.client.address;
            document.getElementById('cl-gst').value = state.client.gst;
            document.getElementById('cl-quoteNo').value = state.client.quoteNo;
            document.getElementById('cl-date').value = state.client.date;
            document.getElementById('cl-validUntil').value = state.client.validUntil;
            document.getElementById('cl-projectName').value = state.client.projectName;
            document.getElementById('cl-projectDesc').value = state.client.projectDesc;

            document.getElementById('dom-name').value = state.domain.name;
            document.getElementById('dom-ext').value = state.domain.ext;
            document.getElementById('dom-period').value = state.domain.period;
            document.getElementById('dom-price').value = state.domain.price;

            document.getElementById('host-plan').value = state.hosting.plan;
            document.getElementById('host-billing').value = state.hosting.billing;
            document.getElementById('host-qty').value = state.hosting.qty;
            document.getElementById('host-price').value = state.hosting.price;

            document.getElementById('pay-discountType').value = state.payment.discountType;
            document.getElementById('pay-discountValue').value = state.payment.discountValue;
            document.getElementById('pay-gstEnabled').value = state.payment.gstEnabled;
            document.getElementById('pay-gstPercent').value = state.payment.gstPercent;
            document.getElementById('pay-advance').value = state.payment.advance;

            renderServiceRows();
            renderAdditionalRows();
            updatePreview();
        }
    } else {
        alert('No saved draft found.');
    }
}

function resetForm() {
    if (confirm('Are you sure you want to reset the entire form? All unsaved data will be lost.')) {
        location.reload();
    }
}