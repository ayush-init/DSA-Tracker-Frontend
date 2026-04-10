# DSA Tracker - Industry-Level Folder Structure Architecture

> **Version**: 1.0  
> **Date**: April 2026  
> **Architect**: Senior Frontend Architect  
> **Stack**: Next.js 15 + TypeScript + TailwindCSS + Zustand + React Query

---

## 📋 Table of Contents

1. [Architecture Principles](#-architecture-principles)
2. [Current vs Proposed Structure](#-current-vs-proposed-structure)
3. [Complete Folder Tree](#-complete-folder-tree)
4. [File Mapping: Old → New](#-file-mapping-old--new)
5. [Migration Plan](#-migration-plan)
6. [Naming Conventions](#-naming-conventions)
7. [Import Patterns](#-import-patterns)
8. [Best Practices](#-best-practices)

---

## 🏛️ Architecture Principles

### 1. **Separation of Concerns**
- `app/` → Routing ONLY (page.tsx, layout.tsx, loading.tsx, error.tsx)
- `components/` → UI Components (feature-based organization)
- `services/` → API Layer (no UI logic)
- `hooks/` → Reusable logic
- `types/` → TypeScript definitions

### 2. **Feature-Based Organization**
- Each feature owns its components, hooks, services, and types
- No cross-feature imports (use shared/common for cross-cutting concerns)

### 3. **Scalability by Role**
- Clear boundaries between Student / Admin / SuperAdmin
- Each role can scale independently

### 4. **Flat is Better Than Nested**
- Maximum 3 levels of nesting in components/
- Easy to locate files

---

## 🔄 Current vs Proposed Structure

### ❌ Current Issues

```
src/
├── app/
│   ├── (auth)/login/components/        ← ❌ Components in app/
│   ├── (student)/
│   ├── admin/                          ← ❌ No route group
│   └── superadmin/                     ← ❌ No route group
├── components/
│   ├── student/                        ← ✅ Good
│   │   ├── bookmarks/                  ← ✅ Good
│   │   ├── home/                       ← ⚠️ Vague naming
│   │   ├── practice/                   ← ⚠️ Vague naming
│   │   └── shared/                     ← ❌ Should be in common/
│   ├── admin/                          ← ✅ Good
│   └── superadmin/                     ← ✅ Good
├── services/
│   ├── student/                        ← ✅ Good
│   ├── admin.service.ts                ← ⚠️ Mixing patterns
│   └── superadmin.service.ts           ← ⚠️ Mixing patterns
├── types/
│   ├── student/                        ← ✅ Good
│   └── admin/                          ← ✅ Good
└── hooks/
    ├── useBookmarks.ts                 ← ⚠️ Not organized by role
    └── admin/                          ← ✅ Good
```

---

## 🌲 Complete Folder Tree

```
dsa-tracker-frontend/
├── public/
│   ├── images/
│   │   ├── logo/
│   │   ├── icons/
│   │   └── avatars/
│   ├── fonts/
│   └── favicon.ico
│
├── src/
│   ├── app/                                    ← 📁 ROUTING ONLY
│   │   ├── (auth)/                             ← Route group: Authentication
│   │   │   ├── layout.tsx                      ← Shared auth layout
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   └── verify-otp/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (student)/                          ← Route group: Student
│   │   │   ├── layout.tsx                      ← Student dashboard layout
│   │   │   ├── loading.tsx                     ← Student loading state
│   │   │   ├── error.tsx                       ← Student error boundary
│   │   │   ├── page.tsx                        ← Student home/dashboard
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx                    ← /dashboard
│   │   │   │
│   │   │   ├── topics/
│   │   │   │   ├── page.tsx                    ← /topics
│   │   │   │   └── [topicId]/
│   │   │   │       └── page.tsx                ← /topics/:id
│   │   │   │
│   │   │   ├── bookmarks/
│   │   │   │   └── page.tsx                    ← /bookmarks
│   │   │   │
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx                    ← /leaderboard
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   └── page.tsx                    ← /profile
│   │   │   │
│   │   │   └── practice/
│   │   │       └── page.tsx                    ← /practice
│   │   │
│   │   ├── (admin)/                            ← Route group: Admin
│   │   │   ├── layout.tsx                      ← Admin layout
│   │   │   ├── login/
│   │   │   │   └── page.tsx                    ← /admin/login
│   │   │   │
│   │   │   ├── (dashboard)/                    ← Protected admin routes
│   │   │   │   ├── page.tsx                    ← /admin
│   │   │   │   │
│   │   │   │   ├── students/
│   │   │   │   │   ├── page.tsx                ← /admin/students
│   │   │   │   │   └── [studentId]/
│   │   │   │   │       └── page.tsx
│   │   │   │   │
│   │   │   │   ├── topics/
│   │   │   │   │   ├── page.tsx                ← /admin/topics
│   │   │   │   │   └── [topicId]/
│   │   │   │   │       └── page.tsx
│   │   │   │   │
│   │   │   │   ├── questions/
│   │   │   │   │   └── page.tsx                ← /admin/questions
│   │   │   │   │
│   │   │   │   └── leaderboard/
│   │   │   │       └── page.tsx                ← /admin/leaderboard
│   │   │
│   │   ├── (superadmin)/                       ← Route group: SuperAdmin
│   │   │   ├── layout.tsx                      ← SuperAdmin layout
│   │   │   ├── login/
│   │   │   │   └── page.tsx                    ← /superadmin/login
│   │   │   │
│   │   │   ├── (dashboard)/                    ← Protected superadmin routes
│   │   │   │   ├── page.tsx                    ← /superadmin
│   │   │   │   │
│   │   │   │   ├── cities/
│   │   │   │   │   ├── page.tsx                ← /superadmin/cities
│   │   │   │   │   └── [cityId]/
│   │   │   │   │       └── page.tsx
│   │   │   │   │
│   │   │   │   ├── batches/
│   │   │   │   │   ├── page.tsx                ← /superadmin/batches
│   │   │   │   │   └── [batchId]/
│   │   │   │   │       └── page.tsx
│   │   │   │   │
│   │   │   │   └── admins/
│   │   │   │       ├── page.tsx                ← /superadmin/admins
│   │   │   │       └── [adminId]/
│   │   │   │           └── page.tsx
│   │   │
│   │   ├── api/                                ← API Routes (if needed)
│   │   │   └── ...
│   │   │
│   │   ├── layout.tsx                          ← Root layout
│   │   ├── loading.tsx                         ← Root loading
│   │   ├── error.tsx                           ← Root error
│   │   ├── not-found.tsx                       ← 404 page
│   │   └── globals.css                         ← Global styles
│   │
│   ├── components/                             ← 📁 ALL UI COMPONENTS
│   │   │
│   │   ├── ui/                                 ← shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── command.tsx
│   │   │   ├── form.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar-group.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── sonner.tsx
│   │   │   └── toggle.tsx
│   │   │
│   │   ├── shared/                             ← Cross-cutting components
│   │   │   ├── layout/
│   │   │   │   ├── MainLayout.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── MobileNav.tsx
│   │   │   │
│   │   │   ├── providers/
│   │   │   │   ├── QueryProvider.tsx
│   │   │   │   ├── ThemeProvider.tsx
│   │   │   │   └── AuthProvider.tsx
│   │   │   │
│   │   │   ├── feedback/
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   ├── BruteForceLoader.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   └── NotFoundState.tsx
│   │   │   │
│   │   │   ├── forms/
│   │   │   │   ├── FormField.tsx
│   │   │   │   ├── FormError.tsx
│   │   │   │   └── FormSuccess.tsx
│   │   │   │
│   │   │   ├── data-display/
│   │   │   │   ├── DataTable.tsx
│   │   │   │   ├── Pagination.tsx
│   │   │   │   ├── SortableHeader.tsx
│   │   │   │   └── FilterBar.tsx
│   │   │   │
│   │   │   └── modals/
│   │   │       ├── DeleteModal.tsx
│   │   │       ├── ConfirmationModal.tsx
│   │   │       └── Modal.tsx
│   │   │
│   │   ├── auth/                               ← Auth-related components
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── GoogleAuthButton.tsx
│   │   │   ├── AuthDivider.tsx
│   │   │   ├── PasswordInput.tsx
│   │   │   └── AuthFooter.tsx
│   │   │
│   │   ├── student/                            ← 📁 STUDENT COMPONENTS
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── DashboardHeader.tsx
│   │   │   │   ├── DashboardStats.tsx
│   │   │   │   ├── ActivityHeatmap.tsx
│   │   │   │   ├── RecentQuestions.tsx
│   │   │   │   ├── ProgressOverview.tsx
│   │   │   │   ├── ContinueLearning.tsx
│   │   │   │   └── QuickActions.tsx
│   │   │   │
│   │   │   ├── topics/
│   │   │   │   ├── TopicsHeader.tsx
│   │   │   │   ├── TopicsGrid.tsx
│   │   │   │   ├── TopicCard.tsx
│   │   │   │   ├── TopicProgress.tsx
│   │   │   │   ├── TopicFilter.tsx
│   │   │   │   ├── TopicSearch.tsx
│   │   │   │   ├── TopicSort.tsx
│   │   │   │   ├── SubtopicsList.tsx
│   │   │   │   └── SubtopicCard.tsx
│   │   │   │
│   │   │   ├── bookmarks/
│   │   │   │   ├── BookmarksHeader.tsx
│   │   │   │   ├── BookmarksList.tsx
│   │   │   │   ├── BookmarkCard.tsx
│   │   │   │   ├── BookmarkFilter.tsx
│   │   │   │   ├── BookmarkSort.tsx
│   │   │   │   ├── BookmarkSearch.tsx
│   │   │   │   └── EmptyBookmarks.tsx
│   │   │   │
│   │   │   ├── leaderboard/
│   │   │   │   ├── LeaderboardHeader.tsx
│   │   │   │   ├── LeaderboardTable.tsx
│   │   │   │   ├── LeaderboardRow.tsx
│   │   │   │   ├── LeaderboardFilters.tsx
│   │   │   │   ├── LeaderboardSearch.tsx
│   │   │   │   ├── TopThreeCard.tsx
│   │   │   │   ├── UserRankCard.tsx
│   │   │   │   └── LeaderboardShimmer.tsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── ProfileHeader.tsx
│   │   │   │   ├── ProfileCard.tsx
│   │   │   │   ├── ProfileStats.tsx
│   │   │   │   ├── ProfileHeatmap.tsx
│   │   │   │   ├── ProfileSubmissions.tsx
│   │   │   │   ├── EditProfileForm.tsx
│   │   │   │   ├── ChangePasswordForm.tsx
│   │   │   │   ├── PlatformStats.tsx
│   │   │   │   ├── AchievementList.tsx
│   │   │   │   └── RecentActivity.tsx
│   │   │   │
│   │   │   ├── practice/
│   │   │   │   ├── PracticeHeader.tsx
│   │   │   │   ├── QuestionList.tsx
│   │   │   │   ├── QuestionCard.tsx
│   │   │   │   ├── QuestionFilters.tsx
│   │   │   │   ├── QuestionSearch.tsx
│   │   │   │   ├── DifficultyBadge.tsx
│   │   │   │   ├── PlatformBadge.tsx
│   │   │   │   ├── QuestionStatus.tsx
│   │   │   │   ├── SubmissionForm.tsx
│   │   │   │   ├── CodeEditor.tsx
│   │   │   │   └── TestCases.tsx
│   │   │   │
│   │   │   ├── questions/
│   │   │   │   ├── QuestionDetail.tsx
│   │   │   │   ├── QuestionHeader.tsx
│   │   │   │   ├── QuestionDescription.tsx
│   │   │   │   ├── QuestionExamples.tsx
│   │   │   │   ├── QuestionConstraints.tsx
│   │   │   │   ├── SimilarQuestions.tsx
│   │   │   │   └── DiscussionSection.tsx
│   │   │   │
│   │   │   ├── onboarding/
│   │   │   │   ├── OnboardingLayout.tsx
│   │   │   │   ├── WelcomeStep.tsx
│   │   │   │   ├── PlatformSetupStep.tsx
│   │   │   │   ├── UsernameStep.tsx
│   │   │   │   ├── PreferencesStep.tsx
│   │   │   │   ├── OnboardingProgress.tsx
│   │   │   │   └── OnboardingFooter.tsx
│   │   │   │
│   │   │   └── layout/
│   │   │       ├── StudentSidebar.tsx
│   │   │       ├── StudentHeader.tsx
│   │   │       └── StudentLayout.tsx
│   │   │
│   │   ├── admin/                              ← 📁 ADMIN COMPONENTS
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── AdminDashboardHeader.tsx
│   │   │   │   ├── AdminStatsCards.tsx
│   │   │   │   ├── AdminCharts.tsx
│   │   │   │   ├── RecentActivity.tsx
│   │   │   │   └── QuickActions.tsx
│   │   │   │
│   │   │   ├── students/
│   │   │   │   ├── StudentsHeader.tsx
│   │   │   │   ├── StudentsTable.tsx
│   │   │   │   ├── StudentRow.tsx
│   │   │   │   ├── StudentFilters.tsx
│   │   │   │   ├── StudentSearch.tsx
│   │   │   │   ├── AddStudentModal.tsx
│   │   │   │   ├── EditStudentModal.tsx
│   │   │   │   ├── StudentDetailModal.tsx
│   │   │   │   ├── StudentProgress.tsx
│   │   │   │   └── ImportStudents.tsx
│   │   │   │
│   │   │   ├── topics/
│   │   │   │   ├── TopicsHeader.tsx
│   │   │   │   ├── TopicsTable.tsx
│   │   │   │   ├── TopicRow.tsx
│   │   │   │   ├── AddTopicModal.tsx
│   │   │   │   ├── EditTopicModal.tsx
│   │   │   │   ├── TopicForm.tsx
│   │   │   │   ├── SubtopicsManager.tsx
│   │   │   │   └── TopicReorder.tsx
│   │   │   │
│   │   │   ├── questions/
│   │   │   │   ├── QuestionsHeader.tsx
│   │   │   │   ├── QuestionsTable.tsx
│   │   │   │   ├── QuestionRow.tsx
│   │   │   │   ├── AddQuestionModal.tsx
│   │   │   │   ├── EditQuestionModal.tsx
│   │   │   │   ├── QuestionForm.tsx
│   │   │   │   ├── BulkUpload.tsx
│   │   │   │   ├── QuestionFilters.tsx
│   │   │   │   └── QuestionPreview.tsx
│   │   │   │
│   │   │   ├── leaderboard/
│   │   │   │   ├── AdminLeaderboardHeader.tsx
│   │   │   │   ├── AdminLeaderboardTable.tsx
│   │   │   │   ├── LeaderboardFilters.tsx
│   │   │   │   └── ExportLeaderboard.tsx
│   │   │   │
│   │   │   └── layout/
│   │   │       ├── AdminSidebar.tsx
│   │   │       ├── AdminHeader.tsx
│   │   │       └── AdminLayout.tsx
│   │   │
│   │   └── superadmin/                         ← 📁 SUPERADMIN COMPONENTS
│   │       │
│   │       ├── dashboard/
│   │       │   ├── SuperAdminDashboardHeader.tsx
│   │       │   ├── SuperAdminStatsCards.tsx
│   │       │   ├── SystemOverview.tsx
│   │       │   ├── RecentAdmins.tsx
│   │       │   └── ActivityLog.tsx
│   │       │
│   │       ├── cities/
│   │       │   ├── CitiesHeader.tsx
│   │       │   ├── CitiesTable.tsx
│   │       │   ├── CityRow.tsx
│   │       │   ├── AddCityModal.tsx
│   │       │   ├── EditCityModal.tsx
│   │       │   ├── CityForm.tsx
│   │       │   └── CityStats.tsx
│   │       │
│   │       ├── batches/
│   │       │   ├── BatchesHeader.tsx
│   │       │   ├── BatchesTable.tsx
│   │       │   ├── BatchRow.tsx
│   │       │   ├── AddBatchModal.tsx
│   │       │   ├── EditBatchModal.tsx
│   │       │   ├── BatchForm.tsx
│   │       │   ├── BatchStudents.tsx
│   │       │   └── BatchStats.tsx
│   │       │
│   │       ├── admins/
│   │       │   ├── AdminsHeader.tsx
│   │       │   ├── AdminsTable.tsx
│   │       │   ├── AdminRow.tsx
│   │       │   ├── AddAdminModal.tsx
│   │       │   ├── EditAdminModal.tsx
│   │       │   ├── AdminForm.tsx
│   │       │   ├── AdminPermissions.tsx
│   │       │   └── AdminActivity.tsx
│   │       │
│   │       └── layout/
│   │           ├── SuperAdminSidebar.tsx
│   │           ├── SuperAdminHeader.tsx
│   │           └── SuperAdminLayout.tsx
│   │
│   ├── hooks/                                  ← 📁 CUSTOM HOOKS
│   │   │
│   │   ├── common/                             ← Shared hooks
│   │   │   ├── useDebounce.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── useClickOutside.ts
│   │   │   ├── useScrollPosition.ts
│   │   │   ├── useWindowSize.ts
│   │   │   ├── usePagination.ts
│   │   │   ├── useSearch.ts
│   │   │   ├── useSort.ts
│   │   │   ├── useFilter.ts
│   │   │   ├── useAsync.ts
│   │   │   ├── useToggle.ts
│   │   │   ├── useCopyToClipboard.ts
│   │   │   └── useNetworkStatus.ts
│   │   │
│   │   ├── student/                            ← Student-specific hooks
│   │   │   ├── useBookmarks.ts
│   │   │   ├── useBookmarkActions.ts
│   │   │   ├── useTopics.ts
│   │   │   ├── useTopicProgress.ts
│   │   │   ├── useSubtopics.ts
│   │   │   ├── useQuestions.ts
│   │   │   ├── useQuestionSubmissions.ts
│   │   │   ├── useLeaderboard.ts
│   │   │   ├── useLeaderboardFilters.ts
│   │   │   ├── useProfile.ts
│   │   │   ├── useProfileUpdate.ts
│   │   │   ├── useHeatmapData.ts
│   │   │   ├── usePractice.ts
│   │   │   ├── useRecentQuestions.ts
│   │   │   ├── useOnboarding.ts
│   │   │   ├── useStudentStats.ts
│   │   │   └── usePlatformStats.ts
│   │   │
│   │   ├── admin/                              ← Admin-specific hooks
│   │   │   ├── useAdminAuth.ts
│   │   │   ├── useStudents.ts
│   │   │   ├── useStudentActions.ts
│   │   │   ├── useTopics.ts
│   │   │   ├── useTopicActions.ts
│   │   │   ├── useQuestions.ts
│   │   │   ├── useQuestionActions.ts
│   │   │   ├── useAdminStats.ts
│   │   │   ├── useAdminLeaderboard.ts
│   │   │   ├── useActivityLog.ts
│   │   │   └── useDataExport.ts
│   │   │
│   │   └── superadmin/                         ← SuperAdmin-specific hooks
│   │       ├── useSuperAdminAuth.ts
│   │       ├── useCities.ts
│   │       ├── useCityActions.ts
│   │       ├── useBatches.ts
│   │       ├── useBatchActions.ts
│   │       ├── useAdmins.ts
│   │       ├── useAdminActions.ts
│   │       ├── useSuperAdminStats.ts
│   │       ├── useSystemHealth.ts
│   │       └── useAuditLog.ts
│   │
│   ├── services/                               ← 📁 API LAYER
│   │   │
│   │   ├── common/                             ← Shared services
│   │   │   ├── api-client.ts
│   │   │   ├── auth-service.ts
│   │   │   ├── file-service.ts
│   │   │   └── notification-service.ts
│   │   │
│   │   ├── student/                            ← Student API services
│   │   │   ├── auth.service.ts
│   │   │   ├── topic.service.ts
│   │   │   ├── subtopic.service.ts
│   │   │   ├── question.service.ts
│   │   │   ├── bookmark.service.ts
│   │   │   ├── submission.service.ts
│   │   │   ├── leaderboard.service.ts
│   │   │   ├── profile.service.ts
│   │   │   ├── heatmap.service.ts
│   │   │   ├── practice.service.ts
│   │   │   ├── class.service.ts
│   │   │   └── notification.service.ts
│   │   │
│   │   ├── admin/                              ← Admin API services
│   │   │   ├── auth.service.ts
│   │   │   ├── student.service.ts
│   │   │   ├── topic.service.ts
│   │   │   ├── subtopic.service.ts
│   │   │   ├── question.service.ts
│   │   │   ├── leaderboard.service.ts
│   │   │   ├── stats.service.ts
│   │   │   ├── activity.service.ts
│   │   │   └── export.service.ts
│   │   │
│   │   └── superadmin/                         ← SuperAdmin API services
│   │       ├── auth.service.ts
│   │       ├── city.service.ts
│   │       ├── batch.service.ts
│   │       ├── admin.service.ts
│   │       ├── stats.service.ts
│   │       ├── system.service.ts
│   │       └── audit.service.ts
│   │
│   ├── types/                                  ← 📁 TYPESCRIPT TYPES
│   │   │
│   │   ├── common/                             ← Shared types
│   │   │   ├── api.types.ts
│   │   │   ├── auth.types.ts
│   │   │   ├── user.types.ts
│   │   │   ├── pagination.types.ts
│   │   │   ├── filter.types.ts
│   │   │   ├── sort.types.ts
│   │   │   ├── notification.types.ts
│   │   │   └── utils.types.ts
│   │   │
│   │   ├── ui/                                 ← UI-specific types
│   │   │   ├── button.types.ts
│   │   │   ├── form.types.ts
│   │   │   ├── table.types.ts
│   │   │   ├── modal.types.ts
│   │   │   └── chart.types.ts
│   │   │
│   │   ├── student/                            ← Student types
│   │   │   ├── index.ts                        ← Barrel export
│   │   │   ├── user.types.ts
│   │   │   ├── profile.types.ts
│   │   │   ├── topic.types.ts
│   │   │   ├── subtopic.types.ts
│   │   │   ├── question.types.ts
│   │   │   ├── bookmark.types.ts
│   │   │   ├── submission.types.ts
│   │   │   ├── leaderboard.types.ts
│   │   │   ├── heatmap.types.ts
│   │   │   ├── practice.types.ts
│   │   │   ├── class.types.ts
│   │   │   └── onboarding.types.ts
│   │   │
│   │   ├── admin/                              ← Admin types
│   │   │   ├── index.ts                        ← Barrel export
│   │   │   ├── auth.types.ts
│   │   │   ├── student.types.ts
│   │   │   ├── topic.types.ts
│   │   │   ├── question.types.ts
│   │   │   ├── leaderboard.types.ts
│   │   │   ├── stats.types.ts
│   │   │   └── activity.types.ts
│   │   │
│   │   └── superadmin/                         ← SuperAdmin types
│   │       ├── index.ts                        ← Barrel export
│   │       ├── auth.types.ts
│   │       ├── city.types.ts
│   │       ├── batch.types.ts
│   │       ├── admin.types.ts
│   │       ├── stats.types.ts
│   │       ├── system.types.ts
│   │       └── audit.types.ts
│   │
│   ├── lib/                                    ← 📁 LIBRARY CONFIG
│   │   ├── api/                                ← API configuration
│   │   │   ├── axios-instance.ts
│   │   │   ├── interceptors.ts
│   │   │   ├── error-handler.ts
│   │   │   └── request-config.ts
│   │   │
│   │   ├── auth/                               ← Auth utilities
│   │   │   ├── token-manager.ts
│   │   │   ├── auth-guard.ts
│   │   │   ├── role-guard.ts
│   │   │   ├── password-utils.ts
│   │   │   └── session-utils.ts
│   │   │
│   │   ├── utils/                              ← Core utilities
│   │   │   ├── cn.ts                           ← tailwind-merge
│   │   │   ├── date-utils.ts
│   │   │   ├── string-utils.ts
│   │   │   ├── number-utils.ts
│   │   │   ├── validation-utils.ts
│   │   │   └── crypto-utils.ts
│   │   │
│   │   ├── constants/                          ← App constants
│   │   │   ├── api.constants.ts
│   │   │   ├── app.constants.ts
│   │   │   ├── routes.constants.ts
│   │   │   ├── local-storage.constants.ts
│   │   │   ├── platform.constants.ts
│   │   │   ├── difficulty.constants.ts
│   │   │   └── pagination.constants.ts
│   │   │
│   │   ├── config/                             ← Configuration
│   │   │   ├── app.config.ts
│   │   │   ├── features.config.ts
│   │   │   ├── theme.config.ts
│   │   │   └── query.config.ts
│   │   │
│   │   └── db/                                 ← Database (if needed)
│   │       └── prisma.ts
│   │
│   ├── utils/                                  ← 📁 UTILITY FUNCTIONS
│   │   ├── formatters/                         ← Data formatters
│   │   │   ├── date.formatter.ts
│   │   │   ├── number.formatter.ts
│   │   │   ├── string.formatter.ts
│   │   │   ├── file.formatter.ts
│   │   │   └── currency.formatter.ts
│   │   │
│   │   ├── helpers/                            ← Helper functions
│   │   │   ├── array.helpers.ts
│   │   │   ├── object.helpers.ts
│   │   │   ├── dom.helpers.ts
│   │   │   ├── browser.helpers.ts
│   │   │   └── storage.helpers.ts
│   │   │
│   │   ├── validators/                         ← Validation logic
│   │   │   ├── email.validator.ts
│   │   │   ├── password.validator.ts
│   │   │   ├── username.validator.ts
│   │   │   ├── form.validator.ts
│   │   │   └── file.validator.ts
│   │   │
│   │   └── transformers/                       ← Data transformers
│   │       ├── api.transformer.ts
│   │       ├── form.transformer.ts
│   │       └── csv.transformer.ts
│   │
│   ├── store/                                  ← 📁 ZUSTAND STORES
│   │   │
│   │   ├── common/                             ← Shared stores
│   │   │   ├── theme-store.ts
│   │   │   ├── toast-store.ts
│   │   │   ├── notification-store.ts
│   │   │   └── sidebar-store.ts
│   │   │
│   │   ├── student/                            ← Student stores
│   │   │   ├── auth-store.ts
│   │   │   ├── user-store.ts
│   │   │   ├── bookmark-store.ts
│   │   │   ├── topic-store.ts
│   │   │   ├── question-store.ts
│   │   │   ├── leaderboard-store.ts
│   │   │   ├── practice-store.ts
│   │   │   └── ui-store.ts
│   │   │
│   │   ├── admin/                              ← Admin stores
│   │   │   ├── auth-store.ts
│   │   │   ├── student-store.ts
│   │   │   ├── topic-store.ts
│   │   │   ├── question-store.ts
│   │   │   ├── stats-store.ts
│   │   │   └── ui-store.ts
│   │   │
│   │   └── superadmin/                         ← SuperAdmin stores
│   │       ├── auth-store.ts
│   │       ├── city-store.ts
│   │       ├── batch-store.ts
│   │       ├── admin-store.ts
│   │       ├── stats-store.ts
│   │       └── ui-store.ts
│   │
│   ├── contexts/                               ← 📁 REACT CONTEXTS (minimal)
│   │   └── (use only when necessary)
│   │
│   └── styles/                                 ← 📁 GLOBAL STYLES
│       ├── globals.css
│       ├── variables.css
│       ├── animations.css
│       ├── utilities.css
│       └── themes/
│           ├── light.css
│           └── dark.css
│
├── tests/                                      ← 📁 TESTS
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
│
├── scripts/                                    ← 📁 BUILD SCRIPTS
│   ├── generate-icons.ts
│   ├── generate-types.ts
│   └── seed-data.ts
│
├── docs/                                       ← 📁 DOCUMENTATION
│   ├── api/
│   ├── architecture/
│   └── deployment/
│
├── .env.local.example
├── .env.production.example
├── .eslintrc.js
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json                             ← shadcn config
└── package.json
```

---

## 🗺️ File Mapping: Old → New

### App Router Migration

| Old Path | New Path | Notes |
|----------|----------|-------|
| `src/app/(auth)/login/components/GoogleAuthButton.tsx` | `src/components/auth/GoogleAuthButton.tsx` | Move component out of app/ |
| `src/app/(auth)/login/page.tsx` | `src/app/(auth)/login/page.tsx` | Keep as-is |
| `src/app/(student)/page.tsx` | `src/app/(student)/page.tsx` | Keep as-is |
| `src/app/admin/page.tsx` | `src/app/(admin)/(dashboard)/page.tsx` | Add route groups |
| `src/app/admin/layout.tsx` | `src/app/(admin)/layout.tsx` | Move to route group |
| `src/app/superadmin/page.tsx` | `src/app/(superadmin)/(dashboard)/page.tsx` | Add route groups |
| `src/app/superadmin/layout.tsx` | `src/app/(superadmin)/layout.tsx` | Move to route group |

### Components Migration

| Old Path | New Path |
|----------|----------|
| `src/components/student/home/*` | `src/components/student/dashboard/*` |
| `src/components/student/practice/*` | `src/components/student/practice/*` |
| `src/components/student/shared/*` | `src/components/shared/*` |
| `src/components/leaderboard/*` | `src/components/student/leaderboard/*` |
| `src/components/student/bookmarks/*` | `src/components/student/bookmarks/*` |
| `src/components/student/topics/*` | `src/components/student/topics/*` |
| `src/components/student/profile/*` | `src/components/student/profile/*` |
| `src/components/student/onboarding/*` | `src/components/student/onboarding/*` |
| `src/components/student/RecentQuestionsSidebar.tsx` | `src/components/student/dashboard/RecentQuestions.tsx` |
| `src/components/admin/charts/*` | `src/components/admin/dashboard/AdminCharts.tsx` |
| `src/components/admin/questions/*` | `src/components/admin/questions/*` |
| `src/components/admin/students/*` | `src/components/admin/students/*` |
| `src/components/admin/topics/*` | `src/components/admin/topics/*` |
| `src/components/superadmin/DashboardShimmer.tsx` | `src/components/shared/feedback/DashboardShimmer.tsx` |
| `src/components/superadmin/admins/*` | `src/components/superadmin/admins/*` |
| `src/components/superadmin/batches/*` | `src/components/superadmin/batches/*` |
| `src/components/superadmin/cities/*` | `src/components/superadmin/cities/*` |
| `src/components/ActionButtons.tsx` | `src/components/shared/data-display/ActionButtons.tsx` |
| `src/components/DeleteModal.tsx` | `src/components/shared/modals/DeleteModal.tsx` |
| `src/components/Modal.tsx` | `src/components/shared/modals/Modal.tsx` |
| `src/components/Pagination.tsx` | `src/components/shared/data-display/Pagination.tsx` |
| `src/components/ThemeToggle.tsx` | `src/components/shared/ThemeToggle.tsx` |
| `src/components/ErrorBoundary.tsx` | `src/components/shared/feedback/ErrorBoundary.tsx` |
| `src/components/TableSkeleton.tsx` | `src/components/shared/feedback/TableSkeleton.tsx` |
| `src/components/ClassesTableShimmer.tsx` | `src/components/shared/feedback/ClassesTableShimmer.tsx` |

### Services Migration

| Old Path | New Path |
|----------|----------|
| `src/services/admin.service.ts` | `src/services/admin/stats.service.ts` |
| `src/services/superadmin.service.ts` | `src/services/superadmin/admin.service.ts` |
| `src/services/auth.service.ts` | `src/services/common/auth-service.ts` |
| `src/services/student/auth.service.ts` | `src/services/student/auth.service.ts` |
| `src/services/student/topic.service.ts` | `src/services/student/topic.service.ts` |
| `src/services/student/leaderboard.service.ts` | `src/services/student/leaderboard.service.ts` |
| `src/services/student/profile.service.ts` | `src/services/student/profile.service.ts` |
| `src/services/bookmark.service.ts` | `src/services/student/bookmark.service.ts` |
| `src/services/topics.service.ts` | `src/services/student/topic.service.ts` |
| `src/services/city.service.ts` | `src/services/superadmin/city.service.ts` |
| `src/services/batch.service.ts` | `src/services/superadmin/batch.service.ts` |

### Hooks Migration

| Old Path | New Path |
|----------|----------|
| `src/hooks/useBookmarks.ts` | `src/hooks/student/useBookmarks.ts` |
| `src/hooks/useLeaderboard.ts` | `src/hooks/student/useLeaderboard.ts` |
| `src/hooks/useDebouncedValue.ts` | `src/hooks/common/useDebounce.ts` |
| `src/hooks/usePasswordValidation.ts` | `src/hooks/common/usePasswordValidation.ts` |
| `src/hooks/useProgressivePasswordValidation.ts` | `src/hooks/common/usePasswordValidation.ts` |
| `src/hooks/useUsernameCheck.ts` | `src/hooks/common/useUsernameCheck.ts` |
| `src/hooks/admin/useTopics.ts` | `src/hooks/admin/useTopics.ts` |

### Types Migration

| Old Path | New Path |
|----------|----------|
| `src/types/student/index.ts` | `src/types/student/index.ts` |
| `src/types/student/profile.ts` | `src/types/student/profile.types.ts` |
| `src/types/student/admin.ts` | `src/types/admin/auth.types.ts` |
| `src/types/admin/question.ts` | `src/types/admin/question.types.ts` |
| `src/types/admin/topic.ts` | `src/types/admin/topic.types.ts` |

### Utils Migration

| Old Path | New Path |
|----------|----------|
| `src/lib/api.ts` | `src/lib/api/axios-instance.ts` |
| `src/lib/auth-utils.ts` | `src/lib/auth/token-manager.ts` |
| `src/lib/error-handler.ts` | `src/lib/api/error-handler.ts` |
| `src/lib/queryClient.ts` | `src/lib/config/query.config.ts` |
| `src/lib/utils.ts` | `src/lib/utils/cn.ts` |
| `src/lib/clear-tokens.js` | `src/lib/auth/token-manager.ts` |
| `src/utils/toast-system.ts` | `src/store/common/toast-store.ts` |
| `src/utils/toast.ts` | `src/store/common/toast-store.ts` |
| `src/utils/progressivePasswordValidation.ts` | `src/utils/validators/password.validator.ts` |

### Store Migration

| Old Path | New Path |
|----------|----------|
| `src/store/adminStore.ts` | `src/store/admin/auth-store.ts` |

---

## 📝 Migration Plan

### Phase 1: Setup & Preparation (Day 1)

```bash
# 1. Create backup branch
git checkout -b refactor/architecture-backup

# 2. Install additional dependencies if needed
npm install zustand @tanstack/react-query axios

# 3. Create new folder structure
mkdir -p src/app/(admin)/(dashboard)
mkdir -p src/app/(superadmin)/(dashboard)
mkdir -p src/components/shared/{layout,providers,feedback,forms,data-display,modals}
mkdir -p src/components/auth
mkdir -p src/hooks/{common,student,admin,superadmin}
mkdir -p src/services/{common,student,admin,superadmin}
mkdir -p src/types/{common,ui,student,admin,superadmin}
mkdir -p src/lib/{api,auth,utils,constants,config}
mkdir -p src/utils/{formatters,helpers,validators,transformers}
mkdir -p src/store/{common,student,admin,superadmin}
```

### Phase 2: Move Shared Components (Day 1-2)

```bash
# 1. Move UI components (already in ui/)
# No action needed - already correct

# 2. Create shared components
mv src/components/ErrorBoundary.tsx src/components/shared/feedback/
mv src/components/DeleteModal.tsx src/components/shared/modals/
mv src/components/Modal.tsx src/components/shared/modals/
mv src/components/Pagination.tsx src/components/shared/data-display/
mv src/components/ActionButtons.tsx src/components/shared/data-display/
mv src/components/ThemeToggle.tsx src/components/shared/
mv src/components/TableSkeleton.tsx src/components/shared/feedback/
mv src/components/ClassesTableShimmer.tsx src/components/shared/feedback/
mv src/components/BruteForceLoader.tsx src/components/shared/feedback/

# 3. Move auth components from app/
mv src/app/(auth)/login/components/GoogleAuthButton.tsx src/components/auth/
mv src/app/(auth)/shared/* src/components/auth/
```

### Phase 3: Reorganize Student Components (Day 2)

```bash
# 1. Rename 'home' to 'dashboard'
mv src/components/student/home/* src/components/student/dashboard/
rmdir src/components/student/home

# 2. Move leaderboard components
mv src/components/leaderboard/* src/components/student/leaderboard/
rmdir src/components/leaderboard

# 3. Move RecentQuestionsSidebar to dashboard
mv src/components/student/RecentQuestionsSidebar.tsx src/components/student/dashboard/RecentQuestions.tsx

# 4. Move shared student components
mv src/components/student/shared/* src/components/shared/
rmdir src/components/student/shared
```

### Phase 4: Reorganize Admin & SuperAdmin (Day 2-3)

```bash
# 1. Move admin charts to dashboard
mv src/components/admin/charts/* src/components/admin/dashboard/
rmdir src/components/admin/charts

# 2. Move shared shimmer to shared
mv src/components/superadmin/DashboardShimmer.tsx src/components/shared/feedback/
```

### Phase 5: Services Reorganization (Day 3)

```bash
# 1. Move services to proper folders
mv src/services/admin.service.ts src/services/admin/stats.service.ts
mv src/services/superadmin.service.ts src/services/superadmin/admin.service.ts
mv src/services/auth.service.ts src/services/common/auth-service.ts

# 2. Move student services
mv src/services/bookmark.service.ts src/services/student/bookmark.service.ts
mv src/services/topics.service.ts src/services/student/topic.service.ts
mv src/services/city.service.ts src/services/superadmin/city.service.ts
mv src/services/batch.service.ts src/services/superadmin/batch.service.ts
```

### Phase 6: Hooks Reorganization (Day 3)

```bash
# 1. Create common hooks folder
mv src/hooks/useBookmarks.ts src/hooks/student/
mv src/hooks/useLeaderboard.ts src/hooks/student/
mv src/hooks/useDebouncedValue.ts src/hooks/common/useDebounce.ts
mv src/hooks/usePasswordValidation.ts src/hooks/common/
mv src/hooks/useProgressivePasswordValidation.ts src/hooks/common/
mv src/hooks/useUsernameCheck.ts src/hooks/common/
```

### Phase 7: Types Reorganization (Day 4)

```bash
# 1. Rename type files
mv src/types/student/profile.ts src/types/student/profile.types.ts
mv src/types/student/admin.ts src/types/admin/auth.types.ts
mv src/types/admin/question.ts src/types/admin/question.types.ts
mv src/types/admin/topic.ts src/types/admin/topic.types.ts

# 2. Add barrel exports to each index.ts
```

### Phase 8: Utils & Lib Reorganization (Day 4)

```bash
# 1. Reorganize lib folder
mv src/lib/api.ts src/lib/api/axios-instance.ts
mv src/lib/auth-utils.ts src/lib/auth/token-manager.ts
mv src/lib/error-handler.ts src/lib/api/error-handler.ts
mv src/lib/queryClient.ts src/lib/config/query.config.ts
mv src/lib/utils.ts src/lib/utils/cn.ts

# 2. Reorganize utils folder
mv src/utils/toast-system.ts src/store/common/toast-store.ts
mv src/utils/toast.ts src/store/common/toast-store.ts
mv src/utils/progressivePasswordValidation.ts src/utils/validators/password.validator.ts
```

### Phase 9: Store Reorganization (Day 4)

```bash
# 1. Move stores
mv src/store/adminStore.ts src/store/admin/auth-store.ts

# 2. Create new stores for Zustand migration
```

### Phase 10: Route Groups & App Structure (Day 5)

```bash
# 1. Create route groups for admin
mkdir -p src/app/(admin)/(dashboard)
mv src/app/admin/page.tsx src/app/(admin)/(dashboard)/
mv src/app/admin/layout.tsx src/app/(admin)/
mv src/app/admin/login src/app/(admin)/
mv src/app/admin/students src/app/(admin)/(dashboard)/
mv src/app/admin/topics src/app/(admin)/(dashboard)/
mv src/app/admin/questions src/app/(admin)/(dashboard)/
mv src/app/admin/leaderboard src/app/(admin)/(dashboard)/
rmdir src/app/admin

# 2. Create route groups for superadmin
mkdir -p src/app/(superadmin)/(dashboard)
mv src/app/superadmin/page.tsx src/app/(superadmin)/(dashboard)/
mv src/app/superadmin/layout.tsx src/app/(superadmin)/
mv src/app/superadmin/login src/app/(superadmin)/
mv src/app/superadmin/admins src/app/(superadmin)/(dashboard)/
mv src/app/superadmin/batches src/app/(superadmin)/(dashboard)/
mv src/app/superadmin/cities src/app/(superadmin)/(dashboard)/
rmdir src/app/superadmin

# 3. Add signup page to (auth)
mkdir -p src/app/(auth)/signup
# Create src/app/(auth)/signup/page.tsx
```

### Phase 11: Fix All Imports (Day 5-6)

```bash
# Use find and sed or a script to update imports
# Or use VS Code's global search and replace

# Common patterns:
# @/components/student/shared/* → @/components/shared/*
# @/components/leaderboard/* → @/components/student/leaderboard/*
# @/services/admin.service → @/services/admin/stats.service
# etc.
```

### Phase 12: Testing & Validation (Day 6-7)

```bash
# 1. Run TypeScript check
npm run type-check

# 2. Run ESLint
npm run lint

# 3. Build the application
npm run build

# 4. Test all routes
npm run dev
# Manually test:
# - /login
# - /signup
# - /forgot-password
# - /dashboard
# - /topics
# - /bookmarks
# - /leaderboard
# - /profile
# - /admin/*
# - /superadmin/*
```

---

## 🏷️ Naming Conventions

### Folder Naming

| Type | Convention | Example |
|------|------------|---------|
| Route Groups | parentheses + kebab-case | `(student)`, `(auth)` |
| Feature Folders | kebab-case | `bookmarks/`, `leaderboard/` |
| Utility Folders | kebab-case | `utils/`, `validators/` |

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BookmarkCard.tsx` |
| Hooks | camelCase with `use` prefix | `useBookmarks.ts` |
| Services | camelCase with `Service` suffix | `bookmark.service.ts` |
| Types | PascalCase with `.types.ts` suffix | `bookmark.types.ts` |
| Utils | camelCase | `dateUtils.ts` |
| Constants | UPPER_SNAKE_CASE in file | `API_BASE_URL` |
| Stores | camelCase with `Store` suffix | `bookmarkStore.ts` |
| Page Files | `page.tsx` (Next.js convention) | `page.tsx` |
| Layout Files | `layout.tsx` (Next.js convention) | `layout.tsx` |
| Loading Files | `loading.tsx` (Next.js convention) | `loading.tsx` |
| Error Files | `error.tsx` (Next.js convention) | `error.tsx` |

### Component Naming Rules

```tsx
// ✅ GOOD
BookmarkCard.tsx
LeaderboardTable.tsx
AdminDashboardHeader.tsx

// ❌ BAD
bookmarkCard.tsx        // lowercase
bookmark-card.tsx       // kebab-case
Bookmark.tsx            // too vague
BLCard.tsx              // abbreviations
```

### Hook Naming Rules

```tsx
// ✅ GOOD
useBookmarks.ts
useTopicProgress.ts
useAdminAuth.ts

// ❌ BAD
use_bookmarks.ts        // snake_case
UseBookmarks.ts         // PascalCase
usebookmark.ts          // no camelCase
bookmarks.ts            // missing 'use' prefix
```

### Service Naming Rules

```tsx
// ✅ GOOD
bookmark.service.ts
profile.service.ts
admin.service.ts

// ❌ BAD
bookmarkService.ts      // no dot notation
bookmark-service.ts     // kebab-case
BookmarkService.ts      // PascalCase
```

### Type Naming Rules

```tsx
// ✅ GOOD
// File: bookmark.types.ts
export interface Bookmark {
  id: string;
  questionId: string;
}

export type BookmarkFilters = {
  topicId?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
};

// ❌ BAD
export interface IBookmark {        // Don't use I prefix
export interface bookmarkType {      // PascalCase for types
export type TBookmarkFilters {      // Don't use T prefix
```

---

## 🔌 Import Patterns

### Barrel Exports

```typescript
// src/components/student/bookmarks/index.ts
export { BookmarkHeader } from './BookmarkHeader';
export { BookmarkList } from './BookmarkList';
export { BookmarkCard } from './BookmarkCard';
export { BookmarkFilter } from './BookmarkFilter';
export type { BookmarkListProps } from './BookmarkList';

// Usage in page.tsx
import { BookmarkHeader, BookmarkList } from '@/components/student/bookmarks';
```

### Absolute Imports (Path Aliases)

```typescript
// tsconfig.json paths
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/services/*": ["./src/services/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/store/*": ["./src/store/*"]
    }
  }
}
```

### Import Order Convention

```tsx
// 1. React/Next.js imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party imports
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

// 3. Absolute imports (@/)
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/student/useBookmarks';
import { bookmarkService } from '@/services/student/bookmark.service';
import type { Bookmark } from '@/types/student/bookmark.types';

// 4. Relative imports (only within same feature)
import { BookmarkCard } from './BookmarkCard';

// 5. Styles (last)
import styles from './BookmarkList.module.css';
```

---

## ✅ Best Practices

### 1. App Folder Rules

```tsx
// ✅ GOOD: app/ only contains routing logic
// src/app/(student)/bookmarks/page.tsx
import { BookmarksHeader, BookmarkList } from '@/components/student/bookmarks';

export default function BookmarksPage() {
  return (
    <div>
      <BookmarksHeader />
      <BookmarkList />
    </div>
  );
}

// ❌ BAD: Don't put component logic in app/
// src/app/(student)/bookmarks/page.tsx
export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);  // Logic should be in component
  // ... 50 lines of logic
  return <div>...</div>;
}
```

### 2. Component Rules

```tsx
// ✅ GOOD: Single responsibility, clear props interface
// src/components/student/bookmarks/BookmarkCard.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import type { Bookmark } from '@/types/student/bookmark.types';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
}

export function BookmarkCard({ bookmark, onDelete }: BookmarkCardProps) {
  return (
    <Card>
      {/* Card content */}
    </Card>
  );
}
```

### 3. Hook Rules

```tsx
// ✅ GOOD: Hook handles all data fetching and state
// src/hooks/student/useBookmarks.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarkService } from '@/services/student/bookmark.service';
import type { Bookmark } from '@/types/student/bookmark.types';

export function useBookmarks() {
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => bookmarkService.getAll(),
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => bookmarkService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
  
  return {
    bookmarks: data ?? [],
    isLoading,
    deleteBookmark: deleteMutation.mutate,
  };
}
```

### 4. Service Rules

```tsx
// ✅ GOOD: Pure API layer, no UI logic
// src/services/student/bookmark.service.ts
import { apiClient } from '@/lib/api/axios-instance';
import type { Bookmark, CreateBookmarkDTO } from '@/types/student/bookmark.types';

export const bookmarkService = {
  async getAll(): Promise<Bookmark[]> {
    const { data } = await apiClient.get('/student/bookmarks');
    return data;
  },
  
  async create(dto: CreateBookmarkDTO): Promise<Bookmark> {
    const { data } = await apiClient.post('/student/bookmarks', dto);
    return data;
  },
  
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/student/bookmarks/${id}`);
  },
};
```

### 5. Store Rules (Zustand)

```tsx
// ✅ GOOD: Minimal, focused stores
// src/store/student/bookmark-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Bookmark } from '@/types/student/bookmark.types';

interface BookmarkState {
  selectedBookmark: Bookmark | null;
  filter: string;
  setSelectedBookmark: (bookmark: Bookmark | null) => void;
  setFilter: (filter: string) => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  devtools(
    (set) => ({
      selectedBookmark: null,
      filter: '',
      setSelectedBookmark: (bookmark) => set({ selectedBookmark: bookmark }),
      setFilter: (filter) => set({ filter }),
    }),
    { name: 'BookmarkStore' }
  )
);
```

---

## 📊 Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    app/     │  │ components/ │  │      hooks/         │  │
│  │   Routes    │  │     UI      │  │      Logic          │  │
│  │   (pages)   │  │  (views)      │  │   (data fetching)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   store/    │  │  services/  │  │      types/         │  │
│  │   State     │  │    API      │  │   TypeScript        │  │
│  │  (Zustand)  │  │  (axios)    │  │   Definitions       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    lib/     │  │    utils/   │  │   constants/        │  │
│  │   Config    │  │   Helpers   │  │   (hard-coded)      │  │
│  │  (axios)    │  │ (formatters)│  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Key Takeaways

1. **App Router = Routing ONLY**: No components, no logic in `app/` folder
2. **Feature-Based Organization**: Each feature owns its components, hooks, services, and types
3. **Clear Role Boundaries**: Student/Admin/SuperAdmin are completely separated
4. **Barrel Exports**: Use `index.ts` for clean imports
5. **Path Aliases**: Always use `@/` imports, never relative `../../../`
6. **Naming Consistency**: Follow conventions strictly
7. **Zustand for State**: Replace Context API for global state
8. **React Query for Server State**: Replace manual data fetching

---

## 🚀 Next Steps

1. Review this document with your team
2. Create the backup branch
3. Follow the migration plan step-by-step
4. Test after each phase
5. Update documentation as you go

---

**Document Version**: 1.0  
**Last Updated**: April 2026  
**Maintained by**: Frontend Architecture Team
